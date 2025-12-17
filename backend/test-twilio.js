require('dotenv').config();
const { sendWhatsAppMessage } = require('./services/twilio');

const testSend = async () => {
    try {
        const to = '+919060494819';
        const body = 'Hello! This is a test message from your WhatsApp Scheduler.';
        console.log(`Sending test message to ${to}...`);
        
        const sid = await sendWhatsAppMessage(to, body);
        console.log(`Successfully sent! SID: ${sid}`);
    } catch (error) {
        console.error('Test failed:', error.message);
    }
};

testSend();
