// 广度优先遍历， 先访问离根节点最近的节点, r然后采访问子节点

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

// 使用数组模拟队列
const bfs = root => {
  const q = []
  q.push(root)
  while(q.length > 0) {
    const n = q.shift()
    if(n && n.val) {
      console.log(n.val)
    }

    (n.children || []).forEach(child => {
      q.push(child)
    })
  }
}

bfs(tree)
// a b g c f h l d e
