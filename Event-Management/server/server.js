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

const buildPath = path.join(__dirname, 'dist');
app.use(express.static(buildPath)); // react folder

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // image upload folder

// Middleware error handling
app.use((err, req, res, next) => {
  console.error(err.stack); // still useful for logging
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

app.get("/hello", (req, res) => { 
    res.send("hello!");
});

app.use("/api", apiRouter);

/*app.get('/*splat', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
}); */

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}, http://localhost:${PORT}`);
});
