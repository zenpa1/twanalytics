import tmi from 'tmi.js';
const config = require('./config');
const { saveMessage } = require('./firestore');

// Create a Twitch chat client
const client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: config.TWITCH_BOT_USERNAME,
        password: config.TWITCH_OAUTH_TOKEN
    },
    channels: [config.TWITCH_CHANNEL]
})

client.connect();

// Listener for chat messages
client.on('message', async (channel, userstate, message, self) => {
    // Ignores own messages
    if (self) return;  

    // Log chat activity
    console.log(`${userstate['display-name']}: ${message}`);

    // Save chat message to Firestore
    await saveMessage(userstate['display-name'], message);

    // Respond to commands
    if (message.startsWith('!hello')) {
        client.say(channel, `Hello, ${userstate['display-name']}!`);
    }
})