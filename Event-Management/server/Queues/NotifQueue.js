const Queue = require('bull');
const redisClient = require('../configuration/redis');
const Notification = require('../models/Notification');
const { sendSocketNotification } = require('../utils/socket');
const logger = require('../utils/Logger'); 

// Initialize queue with enhanced configuration
const notificationQueue = new Queue('event-notifications', {
  redis: redisClient.options,
  settings: {
    stalledInterval: 300000, // 5 minutes
    maxStalledCount: 2
  }
});

// Process jobs with concurrency control and error handling
notificationQueue.process(5, async (job) => { // Process 5 jobs concurrently
  try {
    const { eventId, userIds, message } = job.data;
    
    // 1. Save notifications to MongoDB 
    const notifications = await Notification.insertMany(
      userIds.map(userId => ({
        user: userId,    // Match Notification schema field name
        event: eventId,  // Match Notification schema field name
        message
      }))
    );

    // 2. Send real-time notifications via WebSocket
    await sendSocketNotification(
      userIds, 
      { 
        eventId, 
        message,
        timestamp: new Date().toISOString()
      }
    );

    // 3. Log successful processing
    logger.info(`Processed notification job ${job.id} for event ${eventId}`);
    
    return { notificationCount: notifications.length };
  } catch (error) {
    logger.error(`Notification job ${job.id} failed: ${error.message}`, {
      stack: error.stack
    });
    throw error; // Let Bull handle retries
  }
});

// Handle queue events for monitoring
notificationQueue
  .on('completed', (job, result) => {
    logger.info(`Job ${job.id} completed. Notifications sent: ${result.notificationCount}`);
  })
  .on('failed', (job, error) => {
    logger.error(`Job ${job.id} failed: ${error.message}`);
  })
  .on('stalled', (job) => {
    logger.warn(`Job ${job.id} stalled`);
  });

// Cleanup old jobs 
const cleanOldJobs = async () => {
  const daysToKeep = 7;
  await notificationQueue.clean(1000 * 60 * 60 * 24 * daysToKeep, 'completed');
  await notificationQueue.clean(1000 * 60 * 60 * 24 * daysToKeep, 'failed');
};
setInterval(cleanOldJobs, 1000 * 60 * 60 * 24); // Daily cleanup

module.exports = notificationQueue;