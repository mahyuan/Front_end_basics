const http = require('http')
const port = 9999
/*
http.createServer(function(request, response) {
  console.log('requset url', request.url);
  const data = {
    code: 0,
    msg: 'hello'
  }

  response.end(JSON.stringify(data))
}).listen(port)
console.log('server listen at ' + port);
*/

const server = http.createServer(function(req, res) {
  const data = {
    code: 0,
    msg: 'hello '
  }
  res.end(JSON.stringify(data))
})
server.listen(port, '127.0.0.1', function() {
  console.log('server start at http://127.0.0.1:' + port);
})
