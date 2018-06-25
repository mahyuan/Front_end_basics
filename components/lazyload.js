export default class Lazyload {
	constructor({
								ele = window,
								selector = 'img[data-src',
								clientHeight = document.documentElement.clientHeight, //可视窗口高度
								offset = 100
							} = {}) {
		this.selector = selector;
		this.offset = offset;
		this.clientHeight = clientHeight;
		this.scroll = this._scroll.bind(this)
		ele.addEventListener('scroll', this.scroll, false)
		this.scroll();
	}

	_scroll() {
		Array.from(document.querySelectorAll(this.selector)).forEach(ele => {
			const rect = ele.getBoundingClientRect();
			let src = ele.dataset.src || '';

			if(src.trim() && rect.top < (this.clientHeight + this.offset) && (rect.top >= 0 || rect.bottom >=0) ) {
				const img = new Image();
				img.onload = () => {
					if( ele.nodeName.toLocaleLowerCase() === 'img') {
						ele.src = src;
					} else {
						ele.style.backgroundImage = `url(${src})`;
					}
					img.src = src;
					delete ele.dataset.src
				}
			}
		})
	}
}
/*
 1.屏幕可视窗口大小
 原生方法：
 window.innerHeight 标准浏览器及IE9+ ||
 document.documentElement.clientHeight 标准浏览器及低版本IE标准模式 ||
 document.body.clientHeight  低版本混杂模式
 jQuery方法：
 $(window).height();
 2.浏览器窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离：
	**原生方法**：
	window.pagYoffset 标准浏览器及IE9+ ||
	document.documentElement.scrollTop 兼容ie低版本的标准模式 ||
	document.body.scrollTop 兼容混杂模式；
	**jQuery方法**：
	$(document).scrollTop();
	3.获取元素的尺寸
	$(o).width() = o.style.width;
	$(o).innerWidth() = o.style.width+o.style.padding;
	$(o).outerWidth() = o.offsetWidth = o.style.width+o.style.padding+o.style.border；
	$(o).outerWidth(true) = o.style.width+o.style.padding+o.style.border+o.style.margin；
	**注意**
	要使用原生的style.xxx方法获取属性，这个元素必须已经有内嵌的样式，如`<div style="...."></div>`；

	如果原先是通过外部或内部样式表定义css样式，必须使用`o.currentStyle[xxx] || document.defaultView.getComputedStyle(0)[xxx]`来获取样式值。
	4.获取元素的位置信息
	jQuery：
	$(o).offset().top元素距离文档顶的距离
	$(o).offset().left元素距离文档左边缘的距离。
	原生：getoffsetTop();
	顺便提一下返回元素相对于第一个以定位的父元素的偏移距离，注意与上面偏移距的区别；
	jQuery：position()返回一个对象
	$(o).position().left = o.style.left;
	$(o).position().top = o.style.top；
 */
