const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const fromNumber = process.env.TWILIO_PHONE_NUMBER; // Format: whatsapp:+14155238886

const sendWhatsAppMessage = async (to, body, mediaUrl) => {
    try {
        // Ensure 'whatsapp:' prefix is present
        let sender = fromNumber;
        if (!sender.startsWith('whatsapp:')) {
            sender = `whatsapp:${sender}`;
        }

        const messageOptions = {
            from: sender,
            to: `whatsapp:${to}`,
            body: body
        };

        if (mediaUrl) {
            messageOptions.mediaUrl = [mediaUrl];
        }

        const message = await client.messages.create(messageOptions);
        return message.sid;
    } catch (error) {
        console.error('Twilio Error:', error);
        throw error;
    }
};

module.exports = { sendWhatsAppMessage };
