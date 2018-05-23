var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	const share = {
		title: "this is title for goods"
	}
	let goods = {
		title: '雅诗兰黛',
		image: 'https://wicdn.xiaohongchun.com/xhc-plat/1526650002538_h4Xrf8z5xY.jpg-big2x.jpg',
		desc: '雅诗兰黛面膜'
	}
  	
  	res.render('index', {
  		title: 'Express',
  		goods: JSON.stringify(goods)
  	});
});

router.get('/goods', function(req, res, next) {
	const share = {
		title: "this is title for goods"
	}
	let goods = {
		title: '雅诗兰黛面膜',
		image: 'https://wicdn.xiaohongchun.com/goodsmark/goodsmark_15256_1526785205532.jpg-big2x.jpg',
		desc: '雅诗兰黛面膜5张， 用了都说好'
	}

	// res.send(goods)

	res.render('goods', {
		title: share.title,
		goods: JSON.stringify(goods)
	})


})

module.exports = router;
