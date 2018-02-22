const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('iEvent', (...args) => {
	console.log(`an event ${args}`)
})


let handler = function() {
	console.log('handler ^_^ !')
}

emitter.on('iEvent', handler);


// emitter.removeListener('iEvent', handler)

emitter.emit('iEvent', 'a', 'b')
// emitter.emit('iEvent', 'a', 'b')