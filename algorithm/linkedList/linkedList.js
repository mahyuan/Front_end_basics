/**
 * 单向链表
 */
import Comparator from '../utils/Comparator.js';
import LinkedListNode from './LinkedListNode.js'

export default class LinkedList {
   /**
   * @param {Function} [comparatorFunction]
   */
  constructor(comparatorFunction) {
    this.head = null
    this.tail = null
    this.compare = new Comparator(comparatorFunction)
  }

  /**
   * @param {*} value
   * @param{LinkedList}
   */
  prepend(value) {
    // make new node to be head
    const newNode = new LinkedListNode(value, this.head)
    this.head = newNode

    if(!this.tail) {
      this.tail = newNode
    }
    return this
  }


  /**
   * @param {*} value
   * @return {LinkedList}
   */
  append(value) {
    const newNode = new LinkedListNode(value)

    if(!this.head) {
      this.head = newNode
      this.tail = newNode

      return this
    }

    this.tail.next = newNode
    this.tail = newNode

    return this
  }

  /**
   * @param {*} value
   * @return {LinkedListNode}
   */
  delete(value) {
    if(!this.head) {
      return null
    }

    let deleteNode = null

    while(this.head && this.compare.equal(this.head.value, value)) {
      deleteNode = this.head
      this.head = this.head.next
    }

    let currentNode = this.head

    if(currentNode !== null) {
      while(currentNode.next) {
        if(this.compare.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next
          currentNode.next = currentNode.next.next
        } else {
          currentNode = currentNode.next
        }
      }
    }

    if(this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode
    }

    return deleteNode
  }


  /**
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {LinkedListNode}
   */
  find({value = undefined, callback = undefined }) {
    if(!this.head) {
      return null
    }

    let currentNode = this.head

    while(currentNode) {
      if(callback && callback(currentNode.value)) {
        return currentNode
      }

      if(value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode
      }

      currentNode = currentNode.next
    }

    return null
  }

  /**
   * @return {LinkedListNode}
   */
  deleteTail() {
    const deleteTail = this.tail

    if(this.head === this.tail) {
      this.head = null
      this.tail = null

      return deleteTail
    }

    let currentNode = this.head
    while(currentNode.next) {
      if(!currentNode.next.next) {
        currentNode.next = null
      } else {
        currentNode = currentNode.next
      }
    }

    this.tail = currentNode

    return deleteTail
  }

  /**
   * @return {LinkedListNode}
   */
  deleteHead() {
    if(!this.head) {
      return null
    }

    const deleteHead = this.head

    if(this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null

    }

    return deleteHead
  }

  /**
   * @param {*[]} values - Array of values that need to be converted to linked list.
   * @return {LinkedList}
   */
  fromArray(values) {
    values.forEach(value => this.append(value))
    return this
  }

  /**
   * @return {LinkedListNode[]}
   */
  toArray() {
    const nodes = []

    let currentNode = this.head
    while(currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }
    return nodes
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback) {
    return this.toArray().map(node => node.toString(callback)).toString()
    // let arr =this.toArray()
    // console.log('arr' ,arr);
    // let mapArr = arr.map(node => node.toString(callback))
    // console.log('mapArr', mapArr);
    // let str = mapArr.toString()
    // console.log('str', str);
    // return str
  }
  /**
   * Reverse a linked list.
   * @returns {LinkedList}
   */
  reverse() {
    let currNode = this.head
    let prevNode = null
    let nextNode = null

    while(currNode) {
      nextNode = currNode.next

      currNode.next = prevNode

      prevNode = currNode
      currNode = nextNode
    }

    this.tail = this.head
    this.head = prevNode

    return this
  }

/*
  // 前面插入还是后面插入
  insert(newElememt, item) {
    let newNode = new Node(newElememt)
    let currentNode = this.find(item)

    newNode.next = currentNode.next
    currentNode.next = newNode
  }

  find(item) {
    let current = this.head
    while(current && current.element !== item) {
      current = current.next
    }
    return current
  }

  remove(item) {
    let prevNode = this.findPrev(item)
    if(prevNode.next !== null) {
      prevNode.next = prevNode.next.next
    }
  }

  findPrev(item) {
    let currentNode = this.head
    while (currentNode.next !== null && currentNode.element !== item) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  display() {
    let result = []
    let currentNode = this.head

    while(currentNode.next !== null) {
      result.push(currentNode.element)
      currentNode = currentNode.next
    }

    return result
  } */
}

// let list = new LinkedList()
// list.insert('Apple', 'head')
// list.insert('Banana', 'head')
// list.insert('Pear', 'Banana')
// list.insert('China', 'Banana')
// let res = list.display()
// console.log('display:', res);
// list.remove('Apple')
// console.log(list.display());
