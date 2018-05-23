var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	let str = 'respond with a resource'
	let goods = {
		title: '雅诗兰黛面膜',
		image: 'https://wicdn.xiaohongchun.com/goodsmark/goodsmark_15256_1526785205532.jpg-big2x.jpg',
		desc: '雅诗兰黛面膜10张， 用了都说好'
	}

  	res.send(goods);
});

module.exports = router;
