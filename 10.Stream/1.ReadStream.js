// 可读流 可写流(对于fs)

let fs = require('fs')
let ReadStream = require('./ReadStream')

// let rs = fs.createReadStream('./name.txt', {
let rs = new ReadStream('./name.txt', {
  //这个读文件，永远是以根目录
  highWaterMark: 3, //每次读取、默认64*1024
  start: 0,
  end: 7, //8个数字
  flags: 'r',
  encoding: null
})

// 读流的好处，与fs.readFile的区别，不关心整体内容，可以控制速度

let arr = []
rs.on('data', function(chunk) {
  arr.push(chunk) //这个chunk 是 buffer
  console.log('data') //读了三次
})

rs.on('end', function() {
  console.log(Buffer.concat(arr).toString())
})

rs.on('open', function() {
  console.log('open')
})

rs.on('close', function() {
  console.log('close')
})

rs.on('error', function() {
  console.log('error')
})

//可读流 rs.on('data')  rs.on('end')  rs.on('error')
