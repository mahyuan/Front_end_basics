let http = require('http')

http.createServer((req, res) => {
	console.log('----------------server start-----------------------')
	res.writeHead(200, {'Content-Type': 'text/plain'})
	res.end('hello world\n')

}).listen( Math.round((1 + Math.random()) * 1000) , '127.0.0.1')

