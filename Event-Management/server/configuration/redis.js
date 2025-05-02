const Redis = require('ioredis');

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD, // Add password support
  tls: process.env.REDIS_TLS === 'true' ? {} : undefined, // Enable TLS if needed
});
// Add connection monitoring
redisClient.on('connect', () => 
  console.log('Redis client connected'));
  
redisClient.on('error', (err) => 
  console.error('Redis connection error:', err));

redisClient.on('close', () => 
  console.warn('Redis connection closed'));

module.exports = redisClient;