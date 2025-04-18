// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

// Cấu hình middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import và sử dụng các route, ví dụ:
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Có lỗi xảy ra!' });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
