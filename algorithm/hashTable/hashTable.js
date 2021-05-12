/* hashTable 哈希表 （散列表）
 */
/*  hash 需要用到链表，这里再练习一下链表的实现  */
function LinkedList() {
  const Node = function(element) {
    this.element = element
    this.next = null
  }
  // head, length是内部属性，外部不可访问，所以不要绑定到this
  let head = null
  let lenght = 0

  // 尾部添加元素
  this.append = function(element) {
    const node = new Node(element)

    if(!head) {
      head = node
    } else {
      let current = head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    lenght++
  }

  /**
   * 指定位置添加元素
   * @param element any
   * @param position int
   * @return true | false
   */
  this.insert = function(element, position) {
    if(position < 0 || position > lenght) {
      return false
    }

    const node = new Node(element)
    let current = head
    let previous = null
    let index = 0
    if(position ===0) {
      node.next = current
      head = node
    } else {
      while (index++ < position) {
        previous = current
        current = current.next
      }
      previous.next = node
      node.next = current
    }
    lenght++
  }

  this.find = function(element) {
    let current = head
    while (current.next !== element) {
      current = current.next
    }
    return current
  }

  this.remove = function(element) {
    const current = head
    let previous
    while (current.next) {
      previous = current
      if(current.element === element) {
        previous.next = current.next
        return true
      } else {
        current = current.next
      }
    }
  }
  this.removeAt = function(position){};
  this.indexOf = function(element){};
  this.isEmpty = function() {};
  this.size = function() {
    return lenght
  };
  this.toString = function(){};
  this.print = function(){};
}


let linkedList = new LinkedList()
linkedList.append('a')
linkedList.append('b')
