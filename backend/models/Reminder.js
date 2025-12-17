const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    messageBody: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    scheduledTime: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['BIRTHDAY', 'ANNIVERSARY', 'OTHER'],
        default: 'OTHER'
    },
    status: {
        type: String,
        enum: ['PENDING', 'SENT', 'FAILED'],
        default: 'PENDING'
    },
    twilioMessageId: {
        type: String
    },
    error: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Reminder', ReminderSchema);
