const cron = require('node-cron');
const Reminder = require('../models/Reminder');
const { sendWhatsAppMessage } = require('./twilio');

// Schedule: Run every minute
cron.schedule('* * * * *', async () => {
    console.log('Checking for scheduled reminders...');
    try {
        const now = new Date();
        const remindersToSend = await Reminder.find({
            status: 'PENDING',
            scheduledTime: { $lte: now }
        });

        if (remindersToSend.length === 0) {
            console.log('No reminders to send.');
            return;
        }

        console.log(`Found ${remindersToSend.length} reminders to send.`);

        for (const reminder of remindersToSend) {
            try {
                console.log(`Sending reminder ${reminder._id} to ${reminder.phoneNumber}...`);
                
                const sid = await sendWhatsAppMessage(
                    reminder.phoneNumber, 
                    reminder.messageBody,
                    reminder.imageUrl
                );
                
                reminder.twilioMessageId = sid;
                reminder.status = 'SENT';
                await reminder.save();
                
                console.log(`Reminder ${reminder._id} sent successfully. SID: ${sid}`);
            } catch (error) {
                console.error(`Failed to send reminder ${reminder._id}:`, error.message);
                reminder.status = 'FAILED';
                reminder.error = error.message;
                await reminder.save();
            }
        }
    } catch (error) {
        console.error('Error in scheduler:', error);
    }
});
