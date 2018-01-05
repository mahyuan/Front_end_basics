# ES6 学习笔记

## Promise 对象

特点：
1. 状态不受外界影响
	- pending
	- fulfilled
	- rejected
异步操作的结果决定处于哪种状态
2. 一旦状态改变，就不会在变
 	- pending => fulfilled
 	- pending => rejected
	resolved（已定型），一般指 fulfilled状态，不包含rejected状态
不发取消Promise，

