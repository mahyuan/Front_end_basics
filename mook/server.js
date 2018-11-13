let express = require('express');
let fs = require('fs');
let app = express();

const routes = [
	{
		name: 'home',
		type: 'get',
		url: '/home'
	}, {
		name: 'job',
		type: 'get',
		url: '/job'
	}
]

app.get('/index.html', function(req, res) {
  res.sendFile(__dirname + req.path);
});

/*
app.get('/home', function(req, res) {
	res.setHeader('Content-Type', 'application/json;charset=utf-8');
    fs.readFile('./home.json', function(err, data) {
			if(err) {
				throw err;
			}
			res.json(JSON.parse(data));
		})
})
*/

// exports.routes = routes;

routes.forEach((route, index) => {
	let { name, path } = route;

	app[route.type](route.url, function(req, res) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Content-Type', 'application/json;charset=utf-8');
		fs.readFile('./' + name + '.json', function(err, data) {
			if(err) throw err;
			res.json(JSON.parse(data));
		})
	})
})

app.listen(4003, () =>  {
    console.log('app start at port 4003.....');
})


// routes.forEach((route, index) => {
// 	let { name, path } = route;

// 	app.get(path, function(req, res) {
// 			res.setHeader('Access-Control-Allow-Origin', '*');

// 			if(req.method === 'OPTIONS') {
// 					res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE');
// 					res.setHeader('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type, accept');
// 					res.setHeader('Content-Type', 'application/json;charset=utf-8');
// 					res.setHeader('Access-Control-Allow-Credentials', true);
// 			}

// 			fs.readFile('./mook/' + name + '.json', function(err, data) {
// 					if(err) throw err;
// 					console.log(`get request from ${path}, response: ${data}`);

// 					res.json(JSON.parse(data));
// 			})
// 	})
// })

// app.listen(PORT, () => {
// 	console.log(`mook server start at prot ${PORT}.....`);
// })

