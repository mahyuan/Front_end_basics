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
Event.prototype.once = function(name, callback) {
	let handler = (...args) => {
		callback(...args)
		this.removeListener(hanler)
	}

	this.on(name, handler)
}

Event.prototype.removeListener = function(evtName, callback) {
	let handlers = this.evt2Handlers[evtName]
	let index = handlers.indexOf(callback)
	if(index > -1) {
		handlers.splice(index, 1)
	}
}

Event.prototype.emit = function(name, ...args) {
	let handlers = this.evt2Handlers[name] || []
	for(let fn of handlers) {
		fn(...args)
	}
}


let emitter = new Event();

let handler1 = (...args) => {
	console.log(`an event occurred ! with respons: ${args}`)
}
let handler2 = () => {console.log(` another handler2`)}
let handler3 = () => {console.log(` another handler3`)}


// emitter.once('iEvent2', handler2)
emitter.on('iEvent', handler1)
emitter.on('iEvent2', handler2)

emitter.removeListener('iEvent', handler1)

emitter.emit('iEvent', 'ab', 'ba')
// emitter.emit('iEvent', 'a', 'b')
emitter.emit('iEvent2', handler2)

/*
{
	"iEvent": [handler1],
	'iEvent2': [handler2, handler3]
}*/


