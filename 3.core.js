// node基于事件的 发布订阅的模块
// vue $emit $on一样的
const EventEmitter = require('./4.events')
// const EventEmitter = require('./4.events')
const util = require('util')
// 希望可以写一个类来使用这个模块中原型的方法
// 继承公共的

function Girl() {}

util.inherits(Girl, EventEmitter)
let girl = new Girl()

// girl.on('newListener', function(type) {
//   process.nextTick(() => {
//     girl.emit(type, 'ccc')
//   })
// })

f1 = who => {
  console.log(who + '哭')
}
girl.once('失恋', f1)

girl.once('失恋', function(who) {
  console.log(who + '吃')
})

girl.off('失恋', f1)
girl.emit('失恋', 'xxx')
// girl.on('失恋', f1)
