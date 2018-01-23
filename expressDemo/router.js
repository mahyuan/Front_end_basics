var   Router = require('koa-router')
var  url = require('url')
// var   render = requie('render')

var  fs = require('fs')
var  qr = require('qr-image')
var  qs = require('querystring')
var  axios = require('axios')

var router = new Router()

module.exports = router => {
	router.get('/index', function*(next) {
		var interfaces = {}

		var list = yield this.fetch(interfaces, this.req)
		
		const share = {
			title: '',
			content: '',
			target_url: '',
			icon_url: ''
		}
		yield this.render('index', {
			__name: 'index',
			__title: '首页',
			__shareinfo: {
				weixin: share,
				qqzone: share,
				qq: share,
			}
		})
	})
}