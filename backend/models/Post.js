const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: false
    },
    scheduledTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'PUBLISHED', 'FAILED'],
        default: 'PENDING'
    },
    instagramContainerId: {
        type: String
    },
    instagramMediaId: {
        type: String
    },
    error: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
