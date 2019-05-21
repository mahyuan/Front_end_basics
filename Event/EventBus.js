/**
 * react/vue等可以用Event Bus进行通信， 怎么实现
 */

// 使用 Map 结构存储事件
class EventEmeitter {
  constructor() {
    this._events = this._events || new Map()
    this._maxListeners = this._maxListeners || 10
  }
}

// 单个监听
EventEmeitter.prototype.$emit = function(type, ...args) {
  let handler = this._events.get(type)
  if (args.length > 0) {
    handler.apply(this, args)
  } else {
    handler.call(this)
  }
  return true
}

EventEmeitter.prototype.$on = function(type, fn) {
  const handler = this._events.get(type)
  if (!handler) {
    this._events.set(type, fn)
  }
}

// 多个监听
EventEmeitter.prototype.addListener = function(type, fn) {
  const handler = this._events.get(type)
  if (!handler) {
    this._events.set(type, fn)
  } else if (handler && typeof handler === 'function') {
    this._events.set(type, [handler, fn]) // 多个监听，改成数组存储
  } else {
    handler.push(fn)
  }
}

EventEmeitter.prototype.emit = function(type, ...args) {
  const handler = this._events.get(type)
  debugger
  if (!handler) {
    return new Error('事件 ${type} 还没有被申明! ')
  } else if (Array.isArray(handler)) {
    handler.forEach((item, index) => {
      if (args.length > 0) {
        item.apply(this, args)
      } else {
        item.call(this)
      }
    })
  } else {
    if (args.length > 0) {
      handler.apply(this, args)
    } else {
      handler.call(this)
    }
  }
  return true
}

// 移除监听
EventEmeitter.prototype.remove = function(type, fn) {
  const handler = this._events.get(type)
  console.log(handler);
}

let myEmitter = new EventEmeitter()
myEmitter.$on('say', word => {
  console.log(`hello ${word}`);
})
// myEmitter.$emit('say', 'mahy')


// 监听多个say2的事件
myEmitter.addListener('say2', (...args) => {
  console.log(`${args.join(' ')}`);

})

myEmitter.addListener('say2', (...args) => {
  console.log(`${args.reverse().join('__')}`)
})

myEmitter.addListener('say2', (...args) => {
  console.log(`hhh..., ${args[0]}`)
})

// myEmitter.emit('say2', 'mahy', '下班了吗')

myEmitter.remove('say')

