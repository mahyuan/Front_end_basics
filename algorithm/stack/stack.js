/**
 * 栈
 */
import LinkedList from '../linkedList/LinkedList.js'

export default class Stack {
  constructor() {
    this.linkedList = new LinkedList()
  }
  /**
   * @return {boolean}
   */
  isEmpty() {
    return !this.linkedList.head
  }
  /**
   * @returns {*}
   */
  peek() {
    if(this.isEmpty()) {
      return null
    }
    return this.linkedList.head.value
  }

  /**
   * @param {*} value
   */
  push(value) {
    this.linkedList.prepend(value)
  }
  /**
   * @return {*}
   */
  pop() {
    const head = this.linkedList.deleteHead()
    return head ? head.value : null
  }

  /**
   * @return {*}
   */
  toArray() {
    return this.linkedList.toArray().map(linkedListNode => linkedListNode.value)
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback) {
    return this.linkedList.toString(callback)
  }
}



/*
function Stack2() {
  this.list = []
  this.add = function(it) {
    return this.list.push(it)
  }
  this.remove = function() {
    return this.list.pop()
  }
  this.clear = function() {
    this.list = []
  }
  this.size = function() {
    return this.list.length
  }
  this.isEmpty = function() {
    return this.list.length === 0
  }
  this.toString = function() {
    // console.log('====tpstring call');
    console.log(this.list.toString())
  }
}
*/
/*
// 十进制数转二进制
function numberToString(num, base) {
  return parseInt(num).toString(base).toUpperCase()
}

function divideBy2(decNumber) {
  var stack = new Stack()
  var rem
  var str = ''
  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2)
    stack.push(rem)
    decNumber = Math.floor(decNumber / 2)
  }
  while (!stack.isEmpty()) {
    str += stack.pop()
  }
  return str
}
var n1 = 10221
console.log('divideBy2 n1', numberToString(n1, 2), divideBy2(n1))


// 转换为任意进制数据
function baseConverter(decNumber, base) {
  var stack = new Stack()
  var rem
  var baseString = ''
  var digits = "0123456789ABCDEF" // 将十进制转成16进制时，余数是0到8之间的数字加上A、B、C、 D、E和F(对应10、11、12、13、14和15)
  while (decNumber > 0) {
    rem = Math.floor(decNumber % base)
    stack.push(rem)
    decNumber = Math.floor(decNumber / base)
  }
  while (!stack.isEmpty()) {
    baseString += digits[stack.pop()]
  }
  return baseString
}


var n2 = 121323
console.log('baseConverter n2', numberToString(n2, 16), baseConverter(n2, 16)) // 1D9EB 1D9EB
console.log('baseConverter n2', numberToString(n2, 2), baseConverter(n2, 2)) // 11101100111101011 11101100111101011
 */
