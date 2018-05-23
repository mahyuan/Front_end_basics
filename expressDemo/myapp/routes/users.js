var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	let str = 'respond with a resource'
	let user = {
		name: '面瘫少女王小月',
		icon: 'https://wicdn.xiaohongchun.com/cover/F912E4E4ED35051A.jpg-avatars3x.jpg',
		time: Date.now()
	}
	
  	// res.send(user);
  	// res.send(JSON.stringify(user));
  	// res.json(user)
  	// res.redirect('/users')
  	// res.end()
  	res.render('users', {
  		title: 'this user page!',
  		user: JSON.stringify(user)
  	})
});

module.exports = router;
