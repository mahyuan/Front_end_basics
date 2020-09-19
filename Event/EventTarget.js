var EventTarget = function() {
  this.listeners = {}
}

EventTarget.prototype.listeners = null
EventTarget.prototype.addEventListener = function (type, callback) {
  if(!(type in this.listeners)) {
    this.listeners[type] = []
  }
  this.listeners[type].push(callback)
}

EventTarget.prototype.removeEventLIstener = function (type, callback) {
  if(!(type in this.listeners)) {
    return
  }

  var stasks = this.listeners[type]
  for(var i = 0; i < stasks.length; i++) {
    if(stasks[i] === callback) {
      stasks.splice(i, 1)
      return this.removeEventListener(type, callback)
    }
  }
}

EventTarget.prototype.dispatchEvent = function(event) {
  if(!(event.type in this.listeners)) {
    return
  }

  var stasks = this.listeners[event.type]
  event.target = this
  for(var i = 0; i < stasks.length; i++) {
    stasks[i].call(this, event)
  }
}
