/**
 * 单向链表
 */
class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

class LinkList {
  constructor(head = 'head') {
    this.head = new Node(head)
  }

  // 前面插入还是后面插入
  insert(newElememt, item) {
    let newNode = new Node(newElememt)
    let currentNode = this.find(item)

    newNode.next = currentNode.next
    currentNode.next = newNode
  }

  find(item) {
    let current = this.head
    while(current.element !== item) {
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
  }
}

let llist = new LinkList()
llist.insert('Apple', 'head')
llist.insert('Banana', 'head')
llist.insert('Pear', 'Banana')
llist.insert('China', 'Banana')
let res = llist.display()
console.log('display:', res);
llist.remove('Apple')
console.log(llist.display());
