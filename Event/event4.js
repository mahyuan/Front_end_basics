function Event() {
	this.evt2Handlers = {}
}

Event.prototype.on = function(name, callback) {
	if(this.evt2Handlers[name]) {
		this.evt2Handlers[name].push(callback)
	} else {
		this.evt2Handlers[name] = [callback]
	}
}

Event.prototype.emit = function(name, ...args) {
	let handlers = this.evt2Handlers[name] || []
	for(let fn of handlers) {
		fn(...args)
	}
}
Event.prototype.removeListener = function () {

}

let emitter = new Event();

let handler1 = (...args) => {
	console.log(`an event occurred ! with respons: ${args}`)
}

let handler2 = () => {console.log(` another handler2`)}
let handler3 = () => {console.log(` another handler3`)}

emitter.on('iEvent', handler1)

// 以下两种方式 removeListener 效果不一样，两个回调函数的指向是不一样的，本质上不是同一个函数
emitter.removeListener('iEvent1', handler1)
emitter.removeListener('iEvent1', function() {
	console.log('hander removed')
})

emitter.emit('iEvent1', 'a', 'b')






