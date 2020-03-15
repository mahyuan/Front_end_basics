/**
 * 单向链表
 */
class Node {
  constructor(element) {
    this.element = element
    this.next = null
    // this.prev = null
  }
}

class LinkList {
  constructor(head) {
    this.head = head
    this.find = find
    this.insert = insert
    this.remove = remove
    this.findPrev = findPrev
    this.display = this.display
  }
  find(item) {
    let current = this.head
    while(current.element !== item) {
      current = current.next
    }
    return current
  }

  // 前面插入还是后面插入
  insert(newElememt, item) {
    let newNode = new Node(newElememt)
    let currentNode = this.find(item)

    newItem.next = currentNode.next
    currentNode.next = newNode
  }

  remove(item) {
    // let currentNode = this.head

  }
}
