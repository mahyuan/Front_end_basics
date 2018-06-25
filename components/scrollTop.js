export default class ScrollTop {
	constructor(container = document.body) {
		this.container = container;
		this.createEle();
		this.addEvt();
	}

	createEle () {
		// let style = require('./scrollTop.css');
		let span = document.createElement('span');
		span.style.className = 'toTop';
		span.style.id = 'toTop';
		this.ele = span;
		document.body.appendChild(span);
	}

	addEvt() {
		this.ele.addEventListener('scroll', this._scroll.bind(this), false);
		this.ele.addEventListener('click', this._click.bind(this), false);
	}

	_scroll() {
		let h = this.container.scrollTop;
		if(h > 500) this.ele.style.display = 'block';
		else this.ele.style.display = 'none';
	}

	_click() {
		let h = this.container.scrollTop;
		this.container.scrollTop = 0;
	}
}
