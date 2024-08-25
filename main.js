
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal')
// const express = require('express')

// const app = express()
// const port = 3001

// const allSessionsObject = {}

// app.listen(port, () => {
//     console.log(`   Whatsapp server is ready: ${port}`)
// })

const client = new Client({
    puppeteer: {
        headless: true
    },
    authStrategy: new LocalAuth({
        clientId: "YOUR_CLIENT_ID"
    })
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true })
});


client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();