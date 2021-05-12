/**
 * 队列(Queue) 是只允许在一端进行插入，而在另一端进行删除的运算受限的线性表
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
 * empty： 判断队列是否为空；
 * size: 查看队列长度
 */
/*
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

function dequeue() {
  if(this.empty()) return 'This queue is empty';
  else  this.dataStore.shift();
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

function size() {
  return this.dataStore.length;
}
*/

class Queue {
  constructor () {
    this.dataStore = []
  }
  // 在队尾添加一个元素
  enqueue (element) {
    this.dataStore.push(element)
  }
  // 删除队首的元素并返回它
  dequeue () {
    if(this.empty()) {return 'THe dataStore is empty'} else {return this.dataStore.shift()}
  }
  // 将队列清空
  clear () {
    this.dataStore = []
  }
  // 判断队列是否为空
  empty () {
    if (this.dataStore.length == 0) {return true} else {return false}
  }
  // 读取队列首的元素；
  front () {
    if(this.empty()) {return 'THe dataStore is empty'} else {return this.dataStore[0]}
  }
  // 读取队列尾的元素；
  back () {
    if(this.empty()) {return 'THe dataStore is empty'} else {return this.dataStore[this.dataStore.length - 1]}
  }
  // 打印队列元素
  toString () {
    return this.dataStore.toString()
    // return this.dataStore.join('\n');
  }
  // 查看队列长度
  size () {
    return this.dataStore.length
  }
}

// let arr = new Queue()

// arr.enqueue(1)
// arr.enqueue(2)
// arr.enqueue(3)
// arr.enqueue(4)
// arr.enqueue(5)
// arr.enqueue(6)
// console.log(arr)
// // arr.dequeue(2)
// console.log(arr.toString())
// console.log(arr)

/**
 * 基数排序（radix sort）属于“分配式排序”（distribution sort），它是透过键值的部份资讯，将要排序的元素分配至某些“桶”中，藉以达到排序的作用，
 * 基数排序法是属于稳定性的排序，其时间复杂度为O (nlog(r)m)，其中r为所采取的基数，而m为堆数，在某些时候，基数排序法的效率高于其它的稳定性排序法。
 * 先看一下基数排序的的实现步骤（以两位数为例），需要扫描两次，第一次按个位数字进行排序，第二次按十位数字排序，每个数字根据对应的数值分配到到不同的盒子里，
 * 最后将盒子的数字依次取出，组成新的列表即为排序好的数字。
 */

/**
 * 1.假设我们有一串数字，分别为 73, 22, 93, 43, 55, 14, 28, 65, 39, 81
 * 2.首先根据个位数字排序，放到不同的盒子里
 * 3.接下来将这些盒子中的数值重新串接起来，成为以下的数列：81, 22, 73, 93, 43, 14, 55, 65, 28, 39
 * 4.然后根据十位数字排序，再放到不同的盒子里
 * 5.接下来将这些盒子中的数值重新串接起来，整个数列已经排序完毕：14, 22, 28, 39, 43, 55, 65, 73, 81, 93
 */

// 根据相应的（个位和十位）数值，将数字分配到相应队列
function distribution (nums, queues, n, digit) {
  // digit 表示个位或十位的值
  for (var i = 0; i < n; i++) {
    if(digit == 1) {
      queues[nums[i] % 10].enqueue(nums[i])
    } else {
      queues[Math.floor(nums[i] / 10)].enqueue(nums[i])
    }
  }
  // console.log('queues', queues)
}

// 从队列中收集数字
function collect (queues, nums) {
  var i = 0
  for (var digit = 0; digit < 10; digit++) {
    while(!queues[digit].empty()) {
      nums[i++] = queues[digit].front()
      queues[digit].dequeue()
    }
  }
}

// 基数排序
var queues = [] // 队列数组
var nums = [] // 数字数组

// 选十个0~99的随机数进行排序
for (var i = 0; i < 10; i++) {
  queues[i] = new Queue()
  // [0, 1) * 101 = [0, 101) <=100
  // floor() 方法执行的是向下取整计算，它返回的是小于或等于函数参数，并且与之最接近的整数。
  nums[i] = Math.floor(Math.random() * 101)
}

// 排序之前
console.log('排序之前:', nums)
// 基数排序
distribution(nums, queues, 10, 1)
collect(queues, nums)
distribution(nums, queues, 10, 10)
collect(queues, nums)

// 排序之后
console.log('排序之后:', nums)

/**
 * 为充分利用向量空间，克服"假上溢"现象的方法是：将向量空间想象为一个首尾相接的圆环，并称这种向量为循环向量。
 * 存储在其中的队列称为循环队列（Circular Queue）。
 * 即：循环队列中进行出队、入队操作时，头尾指针仍要加1，朝前移动。
 * 只不过当头尾指针指向向量上界（QueueSize-1）时，其加1操作的结果是指向向量的下界0。
 * 当rear在front之前时，队列中剩余一个空间，有 LENGTH - 1个元素，所以rear也为LENGTH - 1。这时就算是队列满了。
 * 于是, 满的判断条件应为：
 * 		(rear+1)%LENGTH == front 。
 * 空的判断条件为:
 * 	 	rear == front。
 */

