# 模块化
## JS 模块化
1. common.js

```js
var Vue = require('vue)

module.exports = {}
```
2. AMD 和 CMD 规范

* AMD (Asynchronous Module Definition)
- AMD 是 RequireJS 在推广过程中对模块定义的规范化产出
```js
define(
	// 模块名
	"Vue",
	// 依赖
	["require", "exports", "beta"],
	// 模块输出
	function (require, exports, beta) {
		exports.verb = function () {
			// return beta.verb()
			return require("beta").verb()
		}
	}
)

// 模块名可以省略
define(
	["a", "b", "c", "d" ],
	function (a, b, c, d) {
		// 等于在最前面申明并初始化了要用到的所有模块
		if( false) {
			// 即便没用到某个模块 b, 但是b还是提前执行了
			b.foo()
		}
	}
)
```
AMD 也采用`require()`语句加载模块，但是不同于CommonJS，它要求两个参数
```js
require(['Vue', 'koa2'], function(Vue, koa2) {})
```
第一个参数为`[module]`是一个包含要加载的模块的数组，第二个参数是加载成功后的回调函数，模块加载完成之后才会执行。

* CMD (Common Module Definition)
- CMD的特点： 尽可能的懒执行
- CMD 是 SeaJS 在推广过程中对模块定义的规范化产出
```js
// 所有模块都通过define 定义
define(function(require, exports, module) {
	// 通过require引入依赖
	var $ = require('jquery')
	var Spining = require('./spining')

	// 通过 exports 对外提供接口
	exports.doSomethindg = ...

	// 或者通过 module.exports 提供整个接口
	module.exports = ...
})
```
* AMD 和 CMD 的共同点： 
- 一个文件为一个模块
- 使用defin来定义一个模块
- 使用require来加载一个模块， 都是异步加载模块

* AMD 和 CMD 的区别：
- 对依赖的执行方式不一样:
	- AMD把所有的依赖提前执行，但是从requireJS2.0 开始也可以延迟执行; CMD是延迟执行
	- AMD推崇依赖前置，CMD 推崇依赖就近
	- AMD 的 API 默认是一个当多个用， CMD 的 API 严格区分， 职责单一 
**NodeJS采用的是CommonJS规范， NodeJS里的require是懒加载懒执行**
```js
// CMD
define(function(require, exports, module) {   
	var a = require('./a')   
	a.doSomething()   
	// 此处略去 100 行   
	var b = require('./b') // 依赖可以就近书写   
	b.doSomething()   
	// ... 
})

// AMD 默认推荐的是
define(['./a', './b'], function(a, b) {  
	// 依赖必须一开始就写好    
	a.doSomething()    
	// 此处略去 100 行    
	b.doSomething()    
	//...
})
```

方案 | 优势 | 劣势 | 特点
--- | ---- | --- | ---
AMD | 速度快 | 会浪费资源 | 预先加载所有的依赖，直到使用的时候才执行
CMD | 只有真正需要才加载依赖 | 性能较差 | 直到使用的时候才定义依赖

3. ESM (EcmaScript Module)
- 一个文件一个模块
- export/import
```js
// 默认引用
import theDefault from 'src/mylib'
import {named1, named2} from 'src/mylib'

import { named1 as myNamed1, named2} from 'src/mylib'

// import the modiule as an object
import * as mylib from 'src/mylib'

// only load the module, don't import anything
import 'src/mylib'
```
```js
export var myVar1 = ''
export const MY_CONST = ''

export function fn() {}
export function* f1() {}
export class Myclass {}

export default 123

export default function (x) {
	return x
}

export default x => x
default default class {
	constructor (x, y ) {
		this.x = x
		this.y = y
	}
}

const MY_NAME = 'yuan'
function myName (MY_NAME) {
	return MY_NAME
}

export { MY_NAME, myName }
export { MY_NAME as THE_CONST, myNAME as thefunc }

export * from 'src/other'
export { foo, bar } from 'src/other'

export { foo as myFoo, bar } from 'src/other'
```

4. Webpack 支持的模块
- AMD （RequireJS)
- ES Modules (推荐的)
- CommonJS

## CSS 模块化
1. CSS设计模式


