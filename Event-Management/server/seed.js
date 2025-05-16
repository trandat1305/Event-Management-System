require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Import User model
const Event = require('./models/Event'); // Import Event model
const Invitation = require('./models/Invitation'); // Import Invitation model
const Discussion = require('./models/EventDiscussion'); // Import Discussion model
const Notification = require('./models/Notification'); // Import Notification model

// Kết nối tới MongoDB
mongoose
  .connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Dữ liệu mẫu cho User
const sampleUsers = Array.from({ length: 20 }).map((_, i) => ({
  username: `user${i + 1}`,
  email: `user${i + 1}@example.com`,
  password: `password${i + 1}`,
  role: i % 3 === 0 ? 'admin' : i % 3 === 1 ? 'organizer' : 'attendee',
}));

const sampleEvents = Array.from({ length: 20 }).map((_, i) => ({
  title: `Event ${i + 1}`,
  description: `Description for Event ${i + 1}`,
  date: new Date(Date.now() + i * 24 * 60 * 60 * 1000), // Ngày tăng dần
  location: `Location ${i + 1}`,
  isPublic: i % 2 === 0, // Xen kẽ giữa public và private
  creator: null, // Sẽ được gán sau khi tạo User
  startTime: new Date(Date.now() + i * 24 * 60 * 60 * 1000), // Thời gian bắt đầu
  endTime: new Date(Date.now() + (i * 24 + 2) * 60 * 60 * 1000), // Thời gian kết thúc (2 giờ sau startTime)
}));
// Dữ liệu mẫu cho Invitation
const sampleInvitations = Array.from({ length: 20 }).map((_, i) => ({
  event: null, // Sẽ được gán sau khi tạo Event
  user: null, // Sẽ được gán sau khi tạo User
  status: i % 3 === 0 ? 'accepted' : i % 3 === 1 ? 'declined' : 'pending',
}));

// Dữ liệu mẫu cho Discussion
const sampleDiscussions = Array.from({ length: 20 }).map((_, i) => ({
  event: null, // Sẽ được gán sau khi tạo Event
  user: null, // Sẽ được gán sau khi tạo User
  content: `Discussion content ${i + 1}`,
  createdAt: new Date(),
}));

// Dữ liệu mẫu cho Notification
const sampleNotifications = Array.from({ length: 20 }).map((_, i) => ({
  event: null, // Sẽ được gán sau khi tạo Event
  user: null, // Sẽ được gán sau khi tạo User
  message: `Notification message ${i + 1}`,
  createdAt: new Date(),
}));

// Hàm để hash mật khẩu và chèn dữ liệu vào MongoDB
const seedDatabase = async () => {
  try {
    // Xóa dữ liệu cũ
    await User.deleteMany({});
    await Event.deleteMany({});
    console.log('✅ Existing data cleared');

    // Hash mật khẩu và chèn User
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );
    const createdUsers = await User.insertMany(hashedUsers);
    console.log('🎉 Sample users added successfully!');

    // Gán creator cho Event
    sampleEvents.forEach((event, i) => {
      event.creator = createdUsers[i % createdUsers.length]._id; // Gán creator từ danh sách người dùng
    });

    const createdEvents = await Event.insertMany(sampleEvents);
    console.log('🎉 Sample events added successfully!');

    process.exit(0); // Thoát sau khi hoàn thành
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

// Gọi hàm seedDatabase
seedDatabase();