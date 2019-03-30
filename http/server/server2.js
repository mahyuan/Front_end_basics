const http  = require('http')
const port = 8809

const server = http.createServer((req, res) => {
  console.log('request from', req.url);
  const data = JSON.stringify({
    // 'code': 0,
    'msg': 'node server'
  })
  res.writeHead(200, {
    'Access-Control-Allow-origin': '*',
    'Accept': 'application/json, text/plain, */*',
    'X-Request': 'JSON',
    'Content-Type': 'application/json;charset=UTF-8'
  })

  res.end(data)
})

server.listen(port, '127.0.0.1', () => {
  console.log('server start at http://127.0.0.1:' + port);
})
