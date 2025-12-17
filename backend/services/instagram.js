const axios = require('axios');

const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const BASE_URL = `https://graph.facebook.com/v21.0/${INSTAGRAM_ACCOUNT_ID}`;

// Create Media Container
const createContainer = async (imageUrl, caption) => {
    try {
        const response = await axios.post(`${BASE_URL}/media`, {
            image_url: imageUrl,
            caption: caption,
            access_token: ACCESS_TOKEN
        });
        return response.data.id; // Container ID
    } catch (error) {
        console.error('Error creating container:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Publish Media
const publishContainer = async (containerId) => {
    try {
        const response = await axios.post(`${BASE_URL}/media_publish`, {
            creation_id: containerId,
            access_token: ACCESS_TOKEN
        });
        return response.data.id; // Media ID
    } catch (error) {
        console.error('Error publishing container:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Check Publishing Limit
const checkLimit = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/content_publishing_limit`, {
            params: { access_token: ACCESS_TOKEN }
        });
        return response.data;
    } catch (error) {
        console.error('Error checking limit:', error);
        return null;
    }
};

module.exports = { createContainer, publishContainer, checkLimit };
