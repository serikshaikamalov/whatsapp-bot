
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal')
const express = require('express')

const globals = {
    qrCode: null
}

const client = new Client({
    puppeteer: {
        headless: true,
        args: ["--no-sandbox"]
    },
    authStrategy: new LocalAuth({
        clientId: "YOUR_CLIENT_ID"
    })
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true })
    globals.qrCode = qr
});


client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});


const app = express()
const port = 3001

app.get('/api/connect', async (req, res) => {
    res.json({ qrCode: globals.qrCode })
})

app.get('/api/send-message', async (req, res) => {
    const { password, phone, text } = req.query

    try {
        if (client.info) {
            // const chatID = phone + `@c.us`
            // const text = `Welcome to HajjTravel. Here is your password ${password}`

            const number_details = await client.getNumberId(phone)
            if (number_details) {
                const response = await client.sendMessage(number_details._serialized, text)
                console.log('Response of sending: ', response)
                res.json({ message: 'Success' })
            } else {
                throw new Error('Mobile number is not registered')
            }
        } else {
            throw new Error('Client is not found')
        }
    } catch (ex) {
        console.error(`Send message ex: `, ex);
        res.json(ex?.message)
    }
})

app.listen(port, () => {
    console.log(`Whatsapp server is ready: ${port}`)

    client.initialize();
})