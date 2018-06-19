/*let fork = require('child_process').fork
let cpus = require('os').cpus()

for(let i=0; i < cpus.length; i++) {
	fork('./worker.js')
}
*/

/**
 * 创建子进程的方法：
 * spawn()
 * exec()
 * execFile()
 * fork()
 */
var cp = require('child_process')

cp.spawn('node', ['worker.js'])
cp.exec('node worker.js', function(err, stdout, stderr) {
	console.log()
})
cp.execFile('worker.js', function(err, stdout, stderr) {

})
cp.fork('./worker.js')




