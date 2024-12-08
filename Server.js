
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();


app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Failed to connect to MongoDB:', error));

    
const User = require('./models/user.js');


app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send('Error retrieving users');
    }
});

app.post('/users', async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).send('Error adding new user');
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(400).send('Error updating user');
    }
});


app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(400).send('Error deleting user');
    }
});

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});