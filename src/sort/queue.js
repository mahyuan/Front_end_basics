/**
 * 队列(Queue)
 * 我们之前说到了栈，它是一种比较高效的数据结构，遵循 先入后出(LIFO，last-in-first-out) 的原则。而今天我们要讨论的队列，
 * 它也是一种特殊的列表，它与栈不同的是， 队列只能在队尾插入元素，在队首删除元素，就像我们平时排队买票一样~
 * 队列用于存储按顺序排列的数据，遵循 先进先出(FIFO，First-In-First-Out) 的原则，也是计算机常用的一种数据结构，别用于很多地方，
 * 比如提交给操作系统的一系列进程，打印池任务等。同栈有点类似，队列的操作主要也是有两种：向队列中插入新元素和删除队列中的元素，即入队和出队操作，
 * 我们采用 enqueue 和 dequeue 两个方法。
 * 除此之外，队列还有一些其他的操作，比如读取队首的元素，该操作仅返回对头元素并不将它从队列中删除，
 * 类似栈的 peek 方法；back 方法读取队尾的元素；toString 方法可以打印当前队列中所有的元素；clear 方法清空当前队列等。
 */

/**
 * 队列常见方法:
 * enqueue: 向队列末尾添加一个元素；
 * dequeue: 删除队列首的元素；
 * front: 读取队列首的元素；
 * back： 读取队列尾的元素；
 * toStrong： 显示队列所有元素；
 * clear： 清空当前队列；
 * empty： 判断队列是否为空.
 */

// 实现队列
function Queue() {
	this.dataStore = [];
	this.enqueue = enqueue;
	this.dequeue = dequeue;
	this.front = front;
	this.back = back;
	this.toString = toString;
	this.clear = clear;
	this.empty = empty; 
}

function enqueue(ele) {
	this.dataStore.push(ele)
}

function dequeue(ele) {
	if(this.empty()) return 'This queue is empty';
	else return this.dataStore.shift();
}

function front() {
	if(this.empty()) return 'This queue is empty';
	else return this.dataStore[0];
}

function back() {
	if(this.empty()) return 'This queue is empty';
	else return this.dataStore[this.dataStore.length - 1];
}

function toString() {
	return this.dataStore.join('\n')
}

function clear() {
	this.dataStore.length = 0;
	return this.dataStore
}

function empty() {
	if(this.dataStore.lenght === 0) return true;
	else return false;
}











