// import A from './A.js'
const A = require('./A.js')
class B extends A {
	constructor (name) {
		super(name);

		// this.age = 22;
	}
}

let b = new B()
b.sayAge(22)
b.sayName('cd')

module.exports = B
