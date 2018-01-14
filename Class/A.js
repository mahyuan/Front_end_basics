/*export default class A {
	constructor() {
		this.age = 21;
		this.name = "mhy";
	}
	sayName() {
		console.info(`name is ${this.name}`)
	}
	sayAge() {
		console.info(`age is ${this.age}`)
	}
}*/

module.exports = class A {
	constructor() {
		this.age = 21;
		this.name = "mhy";
	}
	sayName() {
		console.info(`name is ${this.name}`)
	}
	sayAge() {
		console.info(`age is ${this.age}`)
	}
}


/*
import easout from 'lib/easout'

module.exports = class ScrollTop {
    constructor(container=document.body) {
        this.container = container
        this.createEle()
        this.addEvents()
    }

    createEle() {
        const style = require('stylesheets/totop.css')
        const span = document.createElement('span')
        span.className = style.totop
        span.id="j_toTop";
        this.ele = span
        document.body.appendChild(span)
    }

    addEvents() {
        let ele = (this.container == document.body) ? window : this.container
        ele.addEventListener('scroll', this.scroll.bind(this), false)
        this.ele.addEventListener('click', this.onClick.bind(this), false)
    }

    onClick() {
        let st = this.container.scrollTop
        easout(st, 0, 2, value => this.container.scrollTop = value)
    }

    scroll() {
        const st = this.container.scrollTop
        if(st < 500) this.ele.style.display = 'none'
        else this.ele.style.display = 'block'
    }
}*/