const http  = require('http')
const fs = require('fs')
const port = 8808

const server = http.createServer((req, res) => {
  console.log('request from', req.url);

  res.writeHead(200, {
    // 'Access-Control-Allow-Origin': '*'
    'Content-Type': 'text/html'
  })

  const html = fs.readFileSync('index.html', 'utf8')

  res.end(html)
})

server.listen(port, '127.0.0.1', () => {
  console.log('server start at http://127.0.0.1:' + port);
})
