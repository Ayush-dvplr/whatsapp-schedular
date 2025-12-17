const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage } = require('../utils/cloudinary');
const Reminder = require('../models/Reminder');

const upload = multer({ dest: 'uploads/' });

// Schedule Reminder
router.post('/schedule', upload.single('image'), async (req, res) => {
    try {
        const { phoneNumber, messageBody, scheduledTime, type } = req.body;
        const file = req.file;

        let imageUrl = null;
        if (file) {
            imageUrl = await uploadImage(file.path);
        }

        // Basic validation
        if (!phoneNumber || !scheduledTime) {
             return res.status(400).json({ error: 'Phone number and time are required' });
        }

        const newReminder = new Reminder({
            phoneNumber,
            messageBody: messageBody || '',
            imageUrl,
            scheduledTime: new Date(scheduledTime),
            type: type || 'OTHER',
            status: 'PENDING'
        });

        await newReminder.save();
        res.status(201).json(newReminder);
    } catch (error) {
        console.error('Error scheduling reminder:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get All Reminders
router.get('/', async (req, res) => {
    try {
        const reminders = await Reminder.find().sort({ scheduledTime: 1 });
        res.json(reminders);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
