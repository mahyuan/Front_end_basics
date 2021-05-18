class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

function searchNode(node, key) {
  if(!node) {
    return false
  }
  if(key < node.key) {
    return searchNode(node.left, key)
  } else if(key > node.key) {
    return searchNode(node.right, key)
  } else {
    return true
  }

}
function insertNode (node, newNode) {
  if(newNode.key < node.key) {
    if(node.left === null) {
      node.left = newNode
    } else {
      insertNode(node.left, newNode)
    }
  } else {
    if(node.right === null) {
      node.right = newNode
    } else {
      insertNode(node.right, newNode)
    }
  }
}
function inOrderTraverseNode(node, cb) {
  if(node !== null) {
    inOrderTraverseNode(node.left, cb)
    cb(node.key)
    inOrderTraverseNode(node.right, cb)
  }
}
function preOrderTraverseNode(node, cb) {
  if(node !== null) {
    cb(node.key)
    preOrderTraverseNode(node.left, cb)
    preOrderTraverseNode(node.right, cb)
  }
}
function postOrderTraverseNode(node, cb) {
  if(node !== null) {
    postOrderTraverseNode(node.left, cb)
    postOrderTraverseNode(node.right, cb)
    cb(node.key)
  }
}
function defaultCallback(key) {
  console.log(key)
}

class BirnaryTree {
  constructor() {
    this.root = null
  }
  insert(key) {
    const newNode = new Node(key)
    if(this.root === null) {
      this.root = newNode
    } else {
      insertNode(this.root, newNode)
    }
  }
  inOrderTraverse(callback) {
    callback = callback || defaultCallback
    inOrderTraverseNode(this.root, callback)
  }
  preOrderTraverse(callback) {
    callback = callback || defaultCallback
    preOrderTraverseNode(this.root, callback)
  }
  postOrderTraverse(callback) {
    callback = callback || defaultCallback
    postOrderTraverseNode(this.root, callback)
  }
  get min() {
    let node = this.root
    if(node !== null) {
      while(node && node.left) {
        node = node.left
      }
      return node.key
    }
    return null
  }
  get max() {
    let node = this.root
    if(node !== null) {
      while(node && node.right) {
        node = node.right
      }
      return node.key
    }
    return null
  }
  search(key) {
    return searchNode(this.root, key)
  }
}

var tree = new BirnaryTree()
function print(v) {console.log(v)}
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(26)

console.log('tree', tree)
console.log('search 15', tree.search(15))
console.log('search 25', tree.search(25))
console.log('search 9', tree.search(9))

console.log('min', tree.min)
console.log('max', tree.max)

console.log('inorder')
tree.inOrderTraverse(print)

console.log('preorder')
tree.preOrderTraverse(print)

console.log('postorder')
tree.postOrderTraverse(print)
