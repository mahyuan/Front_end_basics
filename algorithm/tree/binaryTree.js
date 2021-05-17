function BirnaryTree() {
  var root = null
  var Node = function(key) {
    this.key = key
    this.left = null
    this.right = null
  }
  var insertNode = function(node, newNode)  {
    // debugger
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

  var inOrderTraverse = function(node, cb)  {
    if(node !== null) {
      inOrderTraverse(node.left, cb)
      cb(node.key)
      inOrderTraverse(node.right, cb)
    }
  }
  var preOrderTraverse = function(node, cb) {
    if(node !== null) {
      cb(node.key)
      preOrderTraverse(node.left)
      preOrderTraverse(node.right)
    }
  }
  var postOrderTraverse = function(node, cb) {
    if(node !== null) {
      postOrderTraverse(node.left, cb)
      postOrderTraverse(node.right, cb)
      cb(node.key)
    }
  }
  var minNode = function(node) {
    if(node !== null) {
      while (node && node.left !== null) {
        node = node.left
      }

      return node.key
    }
    return null
  }
  var maxNode = function(node) {
    if(node !== null) {
      while(node && node.right) {
        node = node.right
      }
      return node.key
    }
    return null
  }

  var searcNode = function(node, key) {
    if(node === null) {
      return false
    }

    if(node.key < key) {
      searchNode(node.right, key)
    } else if(node.key > key) {
      searchNode(node.left, key)
    } else {
      return true
    }
  }
  var printNode = function(key) {
    console.log(key);
  }
  this.insert = function(value) {
    var newNode = new Node(value)
    if(root === null) {
      root = newNode
    } else {
      insertNode(root, newNode)
    }
  }
  this.inOrderTraverse = function(cb) {
    if(typeof cb !== 'function') {
      cb = printNode
    }
    inOrderTraverse(root, cb)
  }

  this.preOrderTraverse = function(cb) {
    cb = cb || printNode

    preOrderTraverse(root, cb)
  }

  this.postOrderTraverse = function(cb) {
    cb = cb || printNode

    postOrderTraverse(root, cb)
  }
  this.min = function() {
    return minNode(root)
  }
  this.max = function() {
    return maxNode(root)
  }

  this.search = function(key) {
    return searcNode(root, key)
  }

  // TODO
  this.remove = function(key) {

  }

  this.root = root
}


var tree = new BirnaryTree()

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

tree.inOrderTraverse(print)
