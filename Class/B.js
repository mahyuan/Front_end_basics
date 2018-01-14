// import A from './A.js'
const A = require('./A.js')
class B extends A {
	constructor (...args) {
		super(...args);
		this.age = 22;
	}
}

let b = new B()
b.sayAge()
b.sayName()