// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURI)

const PORT = process.env.PORT || 3000;

const apiRouter = require('./routes/centralRoute');

// middleware
app.use(cors()); // reminder to unuse this in production
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error!' });
});

app.get("/", (req, res) => { 
    res.send("hello!");
});

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}, http://localhost:${PORT}`);
});
