// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGOURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const apiRouter = require('./routes/centralRoute');
app.use('/api', apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.get("/hello", (req, res) => { 
    res.send("hello!");
});

/*app.get('/*splat', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
}); */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
