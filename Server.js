
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();


app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Failed to connect to MongoDB:', error));

    
const User = require('./models/user.js');
