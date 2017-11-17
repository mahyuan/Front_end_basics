// const http = require('http')
// console.log(http)

/*
{
	'content-type': 'text/plain',
	'content-length': '111',
	'host': 'mhynet.cn',
	'accept': '*',
	'connection': 'keep-alive'
}*/
/*
http.get({
	hostname: 'localhost',
	part: 2000,
	path: '/',
	agent: false, // 创建一个默认配置的一次性使用的Agent

}, (res) => {
	// 对响应进行处理
	console.log('111')
}).on('socket', (socket) => {
	socket.emit('agentRemove')
});*/

// 代理的配置, 保持 socket 可用即使没有请求，以便它们可被将来的请求使用而无需重新建立一个 TCP 连接。
// 默认为 false
/*const http = require('http')
const keepAliveAgent = new http.Agent({keepAlive: true});
options.agent = keepAliveAgent;
http.request(optiosns, onResponseCallback)
*/

/*const net = require('net');
const client = net.createConnection({ port: 8124 }, () => {
  //'connect' listener
  console.log('connected to server!');
  client.write('world!\r\n');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});*/



// agent.createConnection(options[, callback])
// 选项格式同net,createConnection()

/*socket.setKeepAlive(true, this.keepAliveMsce);
socket.unref();
return true;

agent.destroy()
*/

const http = require('http');
const net = require('net');
const url = require('url');

// 创建一个 HTTP 代理服务器
const proxy = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
proxy.on('connect', (req, cltSocket, head) => {
  // 连接到一个服务器
  const srvUrl = url.parse(`http://${req.url}`);
  const srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
    cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');
    srvSocket.write(head);
    srvSocket.pipe(cltSocket);
    cltSocket.pipe(srvSocket);
  });
});

// 代理服务器正在运行
proxy.listen(1337, '127.0.0.1', () => {

  // 发送一个请求到代理服务器
  const options = {
    port: 1337,
    hostname: '127.0.0.1',
    method: 'CONNECT',
    path: 'www.google.com:80'
  };

  const req = http.request(options);
  req.end();

  req.on('connect', (res, socket, head) => {
    console.log('已连接！');

    // 通过代理服务器发送一个请求
    socket.write('GET / HTTP/1.1\r\n' +
                 'Host: www.google.com:80\r\n' +
                 'Connection: close\r\n' +
                 '\r\n');
    socket.on('data', (chunk) => {
      console.log(chunk.toString());
    });
    socket.on('end', () => {
      proxy.close();
    });
  });
});






const http = require('http');

// 创建一个 HTTP 服务器
const srv = http.createServer( (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
srv.on('upgrade', (req, socket, head) => {
  socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               '\r\n');

  socket.pipe(socket);
});

// 服务器正在运行
srv.listen(1337, '127.0.0.1', () => {

  // 发送一个请求
  const options = {
    port: 1337,
    hostname: '127.0.0.1',
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket'
    }
  };

  const req = http.request(options);
  req.end();

  req.on('upgrade', (res, socket, upgradeHead) => {
    console.log('got upgraded!');
    socket.end();
    process.exit(0);
  });
});


const http = require('http');

const server = http.createServer((req, res) => {
  res.end();
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);

































































