require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('Instagram Scheduler API is Running');
});

// Import Routes
const reminderRoutes = require('./routes/reminders');
app.use('/api/reminders', reminderRoutes);

// Start Scheduler
require('./services/scheduler');

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
