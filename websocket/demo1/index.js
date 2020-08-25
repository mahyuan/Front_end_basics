const WebSocket = require('ws');
const port = 4005
const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({
    port: port
});

wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        setTimeout(() => {
            ws.send(`What's your name?`, (err) => {
                if (err) {
                    console.log(`[SERVER] error: ${err}`);
                }
            });
        }, 1000);
    })
});

console.log(`ws server started at port ${port}...`);
