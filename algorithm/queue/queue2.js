/**
 * 优先级队列
 * 此处以最小优先为例：即优先级的值越小，优先级越高
 * 这里有个特殊的地方，如果没有传入优先级，当做优先级最靠后处理
 */
function PriorityQueue() {
  this.items = []
  function Nodes(value, priority = undefined) {
    this.value = value
    this.priority = priority
  }
  this.enqueue = function(value, priority) {
    const nodes = new Nodes(value, priority)
    if(typeof priority === 'undefined') {
      this.items.push(nodes)
      return
    }
    if(this.empty()) {
      this.items.push(nodes)
      return
    }

    let isAdd = false
    for(let i = 0; i < this.items.length; i ++) {
      const current = this.items[i]
      if(nodes.priority < current.priority || typeof current.priority === 'undefined') {
        this.items.splice(i, 0, nodes)
        isAdd = true
        break
      }
    }
    if(!isAdd) {
      this.items.push(nodes)
    }
  }
  this.dequeue = function() {
    return this.items.shift()
  }
  this.size = function() {
    return this.items.length
  }
  this.empty = function() {
    return this.items.length === 0
  }
  this.print = function() {
    return JSON.stringify(this.items)
  }
}

/* const q = new PriorityQueue()
console.log(q.print());
q.enqueue(1212,2)
console.log(q.print()); // [{"value":1212,"priority":2}]
q.enqueue(112)
console.log(q.print()); // [{"value":112,"priority":1},{"value":1212,"priority":2}]
q.enqueue('12x')
console.log(q.print()); // [{"value":112,"priority":1},{"value":1212,"priority":2},{"value":"12x"}]
q.enqueue(3123,3)
console.log(q.print()); // [{"value":112,"priority":1},{"value":1212,"priority":2},{"value":3123,"priority":3},{"value":"12x"}]
q.enqueue(612,6)
console.log(q.print()); // [{"value":112,"priority":1},{"value":1212,"priority":2},{"value":3123,"priority":3},{"value":612,"priority":6},{"value":"12x"}]
 */



function Queue() {
  this.elements = []
}
Queue.prototype.enqueue = function(e) {
  return this.elements.push(e)
}
Queue.prototype.dequeue = function() {
  return this.elements.shift()
}
Queue.prototype.isEmpty = function() {
  return this.elements.length === 0
}
Queue.prototype.size = function() {
  return this.elements.length
}
Queue.prototype.peek = function() {
  if(this.isEmpty()) {
    return undefined
  }
  return this.elements[0]
}
Queue.prototype.toString = function() {
  return this.elements.toString()
}

/* const q = new Queue()
q.enqueue(2)
console.log(q.toString());
q.enqueue(24)
console.log(q.toString());
q.enqueue(2456)
console.log(q.toString());
q.enqueue(24565)
console.log(q.toString());
q.dequeue(12)
console.log(q.toString());
q.dequeue(12)
console.log(q.toString()); */


/**
 * 循环队列-击鼓传花
 * 实现一个模拟的击鼓传花游戏，要用到这一章开头实现的Queue类(行{1})。
 * 我们会得到一份名单，把里面的名字全都加入队列(行{2})。
 * 给定一个数字，然后迭代队列。从队列开头移 除一项，再将其添加到队列末尾(行{3})，
 * 模拟击鼓传花(如果你把花传给了旁边的人，你被 淘汰的威胁立刻就解除了)。
 * 一旦传递次数达到给定的数字，拿着花的那个人就被淘汰了(从队 列中移除——行{4})。
 * 最后只剩下一个人的时候，这个人就是胜者(行{5})。
 */
 function hotPotato (nameList, num){
  var queue = new Queue(); // {1}
  for (var i = 0; i < nameList.length; i++){
    queue.enqueue(nameList[i]); // {2}
  }
  var eliminated = '';
  while (queue.size() > 1){
    for (var i=0; i<num; i++){
      queue.enqueue(queue.dequeue()); // {3}
    }
    eliminated = queue.dequeue();// {4}
    console.log(eliminated + '在击鼓传花游戏中被淘汰。', queue.toString());
  }
  return queue.dequeue();// {5}
}
var names = ['John','Jack','Camila','Ingrid','Carl'];
var winner = hotPotato(names, 7);
console.log('胜利者:' + winner);
// Camila在击鼓传花游戏中被淘汰。 Ingrid,Carl,John,Jack
// Jack在击鼓传花游戏中被淘汰。 Ingrid,Carl,John
// Carl在击鼓传花游戏中被淘汰。 John,Ingrid
// Ingrid在击鼓传花游戏中被淘汰。 John
// 胜利者:John

function loop(names, num) {
  const queue = new Queue()
  for(let i = 0; i < names.length; i++) {
    queue.enqueue(names[i]) // {1} 先把names传入队列
  }

  while (queue.size() > 1) {
    var removeItem = ''
    for(let j = 0 ; j < num; j++) {
      var it = queue.dequeue()
      queue.enqueue(it)
    }
    removeItem = queue.dequeue()
    console.log('remove item is:', removeItem)
  }
  const lastItem = queue.dequeue()
  return lastItem
}

// var names = ['John','Jack','Camila','Ingrid','Carl'];
var last = loop(names, 7);
console.log('胜利者:' + last);

/*
function Queue() {
  this.list = []
  this.enqueue = function(item) {
    return this.list.push(item)
  }
  this.isEmpty = function() {
    return this.list.length === 0
  }
  this.dequeque = function() {
    return this.list.shift()
  }
  this.clear = function() {
    this.list = []
    return true
  }
  this.size = function() {
    return this.list.length
  }
  // 获取第一个，但是不修改数据
  this.peek = function() {
    return !this.isEmpty() ? this.list[0] : undefined
  }
  this.toString = function() {
    return this.list.toString()
  }
}

const q1 = new Queue()
q1.append({name: 'name1'})
console.log(q1.toString())
// q1.append({name: 'name2'})
// console.log(q1.toString())
// q1.append({name: 'name3'})
// console.log(q1.toString())
// q1.append({name: 'name4'})
// console.log(q1.toString())
*/
