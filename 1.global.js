console.log(Object.keys(global))
//'global',
//'clearInterval',
//'clearTimeout',
//'setInterval',
//'setTimeout',
//'queueMicrotask',
//'clearImmediate',
//'setImmediate'
//----------------------------------------------------------------------------------
//process 进程
//1)
console.log('start')
process.nextTick(() => {
  console.log('nextTick callback') //微任务
})
console.log('scheduled')
// Output:
// start
// scheduled
// nextTick callback
//------------------------------------------------------------
// 用来取代promise
Promise.resolve().then(data => {
  console.log(data)
})
process.nextTick(() => {
  // nextTick 是优先于 promise 微任务
  console.log('nextTick')
})
//--------------------------------------------------------------
//2) 区分平台
console.log(process.platform) //win32
//3) argv 参数列表
console.log(process.argv.slice(2))
const program = require('commander')
let obj = program.parse(process.argv)
console.log(obj)
//4) cwd 当前工作目录
console.log(process.cwd())
//5)每个文件外面 都会包着一层 函数 为了实现模块化 他在当前文件执行的时候 包了一层函数，并且将函数中的this更改了
console.log(arguments)
//6) env 环境变量
