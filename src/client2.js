const WebSocket = require('uws');
const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
    console.log('==> Successfully connected to web socket server');
    ws.send('Hi, I am client 2');

    ws.on('message', message => {
        console.log('==> Message from server:', message);''
    })
});