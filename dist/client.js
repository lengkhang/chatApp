'use strict';

var WebSocket = require('uws');
var ws = new WebSocket('ws://localhost:3000');

ws.on('open', function () {
    console.log('==> Successfully connected to web socket server');
    ws.send('Hi, I am client 1');
});
//# sourceMappingURL=client.js.map