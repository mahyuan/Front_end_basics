
/**
 * promise 后不要用forEach，因为返回的是undefined
 * 可以使用 Promise.all(), 它会以一个promise数组为输入，并且返回一个新的promise给后面的回调, 它是异步的for循环
 * Promise.all()将执行结果以数组的形式返回给下一个函数，一旦数组中任意一个返回错误，他也返回错误
 * http://fex.baidu.com/blog/2015/07/we-have-a-problem-with-promises/
 */

db.allDocs({include_docs: true}).then(function (result) {
	return Promise.all(result.rows.map(function (row) {
		return db.remove(row.doc);
	}));
}).then(function (arrayOfResults) {
	// All docs have really been removed() now!
}).catch(console.log.bind(console))


