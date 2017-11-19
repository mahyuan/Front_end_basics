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
Event.prototype.eventNames = function() {
	return Object.keys(this.evt2Handlers)
}
Event.prototype.listenerCount = function (evtName) {
	return this.evt2Handlers[evtName] ? this.evt2Handlers[evtName].length : 0
}


let emitter = new Event();

let handler1 = (...args) => {
	console.log(`an event occurred ! with respons: ${args}`)
}
let handler2 = () => {console.log(` another handler2`)}
let handler3 = () => {console.log(` another handler3`)}

emitter.on('iEvent1', handler1)

emitter.on('iEvent2', handler2)

emitter.on('iEvent3', handler3)

emitter.emit('iEvent1', 'a', 'b')
emitter.emit('iEvent2', handler2)
emitter.emit('iEvent3', handler3)


console.log(emitter.eventNames()) //

console.log(emitter.listenerCount('iEvent1')) //

console.log(emitter.listenerCount('iEvent4')) //


/*
{
	"iEvent": [handler1],
	'iEvent2': [handler2, handler3]
}*/




