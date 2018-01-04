/**
 * CommonJS 
 * require()
 * module.exports
 * CommonJS规范规定，每个模块内部，module变量代表当前模块。
 * 这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。
 * 加载某个模块，其实是加载该模块的module.exports属性。
 */
var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;

/**
 * require方法用于加载模块。
 */
var example = require('./example.js');
console.log(example.x); // 5
console.log(example.addX(1)); // 6

/**
 * CommonJS模块特点如下：
 * 所有代码都运行在模块作用域，不会污染全局作用域。
 * 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
 * 模块加载的顺序，按照其在代码中出现的顺序。
 */

/**
 * module对象：
 * Node内部提供一个Module构建函数。所有模块都是Module的实例。
 */
console.log(module);
function Module(id, parent) {
  this.id = id;
  this.exports = {};
  this.parent = parent;
  // ...
}

/**
 * 如果在命令行下调用某个模块，比如node something.js，那么module.parent就是null。
 * 如果是在脚本之中调用，比如require('./something.js')，那么module.parent就是调用它的模块。
 * 利用这一点，可以判断当前模块是否为入口脚本。
 */

if (!module.parent) {
    // ran with `node something.js`
    app.listen(8088, function() {
        console.log('app listening on port 8088');
    })
} else {
    // used with `require('/.something.js')`
    module.exports = app;
}

/**
 * ES6
 * import {}
 * export {}
 * export default {}
 * export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
 * 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。
 * 如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。
 * 下面是一个 JS 文件，里面使用export命令输出变量
 */


var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};

/**
 * export命令除了输出变量，还可以输出函数或类（class)
 */

function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};

/**
 * export命令可以出现在模块的任何位置，只要处于模块顶层就可以。
 * 如果处于块级作用域内，就会报错，下一节的import命令也是如此。
 * 这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。
 */


/**
 * 使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。
 */

import {firstName, lastName, year} from './profile';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}

/**
 * 由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
 */


/**
 * 除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
 * 下面是一个circle.js文件，它输出两个方法area和circumference。
 */
// circle.js
export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

// main.js
import { area, circumference } from './circle';

console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));

/**
 * 上面写法是逐一指定要加载的方法，整体加载的写法如下。
 */
//main.js
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));



/** 
 * export default命令，为模块指定默认输出。
 * 上面代码的import命令，可以用任意名称指向export-default.js输出的方法，这时就不需要知道原模块输出的函数名。
 * 需要注意的是，这时import命令后面，不使用大括号。
 * export default命令用在非匿名函数前，也是可以的。
 */
// export-default.js
export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}
export default foo;


/**
 * 对比正常输出和默认输出
 */
// 第一组
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入


/**
 * 第一组是使用export default时，对应的import语句不需要使用大括号；第二组是不使用export default时，对应的import语句需要使用大括号。
 * export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。
 * 所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。
 * 本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。
 */

// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';







