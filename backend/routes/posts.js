const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage } = require('../utils/cloudinary');
const Post = require('../models/Post');

// Multer setup for temporary storage
const upload = multer({ dest: 'uploads/' });

// Create & Schedule Post
router.post('/schedule', upload.single('image'), async (req, res) => {
    try {
        const { caption, scheduledTime } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        // Upload to Cloudinary
        const imageUrl = await uploadImage(file.path);

        // Save to DB
        const newPost = new Post({
            imageUrl,
            caption,
            scheduledTime: new Date(scheduledTime),
            status: 'PENDING'
        });

        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error scheduling post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get All Posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ scheduledTime: 1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
