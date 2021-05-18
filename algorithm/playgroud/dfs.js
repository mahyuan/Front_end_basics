// 深度优先遍历
const tree = {
  val :'a',
  children: [{
    val: 'b',
    children: [{
      val: 'c',
      children: [{
        val: 'd'
      }, {
        val: 'e'
      }]
    }, {
      val: 'f'
    }]
  }, {
    val: 'g',
    children: [{
      val: 'h'
    }, {
      val: 'l'
    }]
  }]
}

// 深度优先遍历 先访问根节点，对根节点的children挨个进行深度优先遍历，递归
const dfs = root => {
  console.log(root.val)
  if(Array.isArray(root.children)) {
    root.children.forEach(dfs)
  }
}
dfs(tree)
// a b g c f h l d e
