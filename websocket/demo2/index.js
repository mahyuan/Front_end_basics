const WebSocket = require('ws');
const port = 4006
const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({
  port: port
});


wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`, ws);
    ws.on('message', function (message) {
      console.log(`[SERVER] Received:`, message);
      ws.send(message, err => {
        if(err) {
          console.log('server send buffer error', err);
        }
      })
    })
});

console.log(`ws server started at port ${port}...`);
