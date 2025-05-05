require('dotenv').config();
const mongoose = require('mongoose');

console.log(process.env.MONGOURI);

mongoose.connect(process.env.MONGOURI).then(() => {
    console.log('Connected to MongoDB');
});