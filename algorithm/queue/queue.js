import LinkedList from '../linkedList/LinkedList.js'

export default class Queue {
  constructor() {
    this.linkedList = new LinkedList()
  }
  /**
   * @return {boolean}
   */
  isEmpty() {
    return !this.linkedList.head;
  }

  /**
   * Read the element at the front of the queue without removing it.
   * @return {*}
   */
  peek() {
    if (!this.linkedList.head) {
      return null;
    }

    return this.linkedList.head.value;
  }

  /**
   * @param {*} value
   */
  enqueue(value) {
    this.linkedList.append(value)
  }


  /**
   * remove the element at the front of queue
   *  if the queue is empty, return null
   * @return {*}
   */
  dequeue() {
    const removeHead = this.linkedList.deleteHead()
    return removeHead ? removeHead.value : null
  }

  /**
   * toString funciton return the queue element' s string
   * @param {*} callback
   * @returns
   */
  toString(callback) {
    return this.linkedList.toString(callback)
  }
}
