var http = require('http');
var Promise = require('../node_modules/bluebird/js/browser/bluebird.js');


fetch(url){
	return new Promise(resolve, reject) {
		console.log('111')

		http.get(url, function(res) {
			var html = ''

			res.on('data', function(data) {
				html += data
			})

			res.on('end', function() {
				resolve(html)
			})
		}).on('error', function(e) {
			reject(e)
			console.log('error')
		})
	}
}

/*coursesData = {
	title: title,
	number: number,
	videos: [{
		chaptertitle: '',
		videos: [
			id: '',
			title: ''
		]
	}]
	chapter
}*/

fetDataArray = []

videoIds.forEach(function(id) {
	// var chapter  = $(this)
	fetDataArray.push(fetch(baseUrl + id))

})

Promise
	.all([])
	.then(function(ages) {
		//
		var coursesData = []

		pages.forEach(function(html) {
			var courses = filterChapters(html)

			coursesData.push(courses)
		})

	})
