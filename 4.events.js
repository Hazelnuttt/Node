function EventEmitter() {
  this._events = Object.create(null)
}
//{"失恋":[]}
EventEmitter.prototype.on = function(eventName, callback) {
  if (!this._events) this._events = Object.create(null)
  if (eventName !== 'newListener') {
    let listeners = this._events['newListener']
    if (listeners) {
      this.emit('newListener', eventName)
    }
  }
  let stack = this._events[eventName] || []
  stack.push(callback)
  this._events[eventName] = stack
}

EventEmitter.prototype.once = function(eventName, callback) {
  // 我需要先订阅，订阅完后出发后，把函数删掉，==>aop
  one = (...args) => {
    callback(...args)
    this.off(eventName, one)
  }
  one.l = callback
  this.on(eventName, one)
}

EventEmitter.prototype.off = function(eventName, callback) {
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter(item => {
      return item !== callback && item.l !== callback
    })
  }
}

EventEmitter.prototype.emit = function(eventName, ...args) {
  if (this._events[eventName]) {
    this._events[eventName].forEach(fn => {
      fn(...args)
    })
  }
}

module.exports = EventEmitter
