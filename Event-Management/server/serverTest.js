// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(cors()); // reminder to unuse this in production
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'dist')));

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.post("/auth" , (req, res) => {
  const { username, password } = req.body; // req.body.username
  if (username === "admin" && password === "admin") {
    res.status(200).json({ message: "Success!" });
    console.log("Success!");
  } else {
    res.status(401).json({ message: "Wrong" });
    console.log("Wrong username or password!");
  }
});