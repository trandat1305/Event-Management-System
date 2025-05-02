// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

// Cấu hình middleware
app.use(cors()); // reminder to unuse this in production
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'dist')));

// routes examples, commented due to error
// const userRoutes = require('./routes/userRoutes');
// const eventRoutes = require('./routes/eventRoutes');

// app.use('/api/users', userRoutes);
// app.use('/api/events', eventRoutes);

// Middleware error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Có lỗi xảy ra!' });
});

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.post("/auth" , (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    res.status(200).json({ message: "Success!" });
    console.log("Success!");
  } else {
    res.status(401).json({ message: "Wrong" });
    console.log("Wrong username or password!");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}, http://localhost:${PORT}`);
});
