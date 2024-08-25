A library for working with Whatsapp: [text](https://wwebjs.dev/)
Useful video: https://www.youtube.com/watch?v=Lu16rqbLuKQ


Run it on a background service with PM2
```bash
pm2 start main.js
```


# Issue with running on Ubuntu

1. Make it similiar to:
```js
const client = new Client({
    puppeteer: {
        headless: true,
        args: ["--no-sandbox"]
    },
    authStrategy: new LocalAuth({
        clientId: "YOUR_CLIENT_ID"
    })
});
```