modules.exports = function(app) {
	app.get('/', function(req, res) {
	  res.send("123");
	});

	app.get('/customer', function(req, res) {
	  res.send('customer page');
	});

	app.get('/admin', function(req, res){
	  res.send('admin page');
	});
}
