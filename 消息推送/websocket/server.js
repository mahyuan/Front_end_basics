const WebSocket = require('ws');
const port = 9999
const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({
    port: port
});

wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    const url = ws
    console.log('url;', ws);

    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        if(message === 'hello') {
          setInterval(() => {
              ws.send(`What's your name?`, (err) => {
                  // if (err) {
                  //     console.log(`[SERVER] error: ${err}`);
                  // }
              });
          }, 1000);
        }
    })
    ws.on('error', (event) => {
      console.error('[ERROR]', event);
    })
});

console.log(`ws server started at port ${port}...`);
