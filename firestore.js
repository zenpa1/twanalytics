const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Helper function to save chat messages
const saveMessage = async (user, message) => {
    try {
        await db.collection('messages').add({
            user,
            message,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });
    console.log('Message saved to Firestore')
    } catch (error) {
        console.error('Error saving message: ', error);
    }
};

module.exports = { saveMessage }; 