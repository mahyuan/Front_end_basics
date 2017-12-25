/**
 * 立即执行的类
 * @type {class}
 */
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"

/**
 * this 指向
 * 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
 */
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined

/** 
 * 上面代码中，printName方法中的this，默认指向Logger类的实例。
 * 但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境，因为找不到print方法而导致报错。
 * 一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
 */

class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}


/**
 * 另一种解决方法是使用箭头函数。
 */

class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }

  // ...
}
/**
 * 还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。
 */

function selfish (target) {
	const cache = new WeakMap();
	const handler = {
		get (target, key) {
			const value = Reflect.get(target, key);
			if (typeof value !== 'function') {
				return value;
			}

			if (!cache.has(value)) {
				cache.set(value, value.bind(target));
			}

			return cache.get(value);
		}
	};
	const proxy = new Proxy(target, handler);
	return proxy;
}

const logger = selfish(new Logger());

/**
 * name属性总是返回紧跟在class关键字后面的类名。
 * super(name)
 */

/**
 * Class 的取值函数（getter）和存值函数（setter）
 * 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。 
 */

class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'

/**
 * 上面代码中，prop属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。
 * 存值函数和取值函数是设置在属性的 Descriptor 对象上的。
 */

class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);

"get" in descriptor  // true
"set" in descriptor  // true
/**
 * 上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，这与 ES5 完全一致。
 */


/**
 * 原生构造函数的继承
 */

class MyArray extends Array {
	constructor(...args) {
		super(...args);
		this.history = [[]]
	}

	commit() {
		this.history.push(this.slice())
	}

	revert() {
		this.splice(0, this.length, ...this.history[this.history.length - 1])
	}
}
let arr = new MyArray()


/**
 * React.component
 */
//square.js
import React from 'react';
import ReactDOM from 'react-dom';

export default function Square(props) { 
    return (
      <button className="square" onClick={()=> props.onClick()}>
        {props.value}
      </button>
    );
} 
// board.js
import React from 'react';
import ReactDOM from 'react-dom';
import Square from './square';

export default  class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square />
    );
  }
  render() {
    return (
      <div>Hello World!</div>
    );
  }
}






