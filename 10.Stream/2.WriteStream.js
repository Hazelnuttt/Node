// 异步并发
let fs = require('fs')
let ws = fs.createWriteStream('./name.txt', {
  flags: 'w',
  highWaterMark: 3, //读取的限制大小，希望占用多少内存
  autoClose: true,
  start: 0,
  mode: 0o666,
  encoding: 'utf8'
})

//1)
// let flag = ws.write('1', 'utf8', () => {
//   //真正的向文件中写入，这边的flag,是否超过读取限制
//   console.log('写入成功')
// })
// console.log(flag)

// flag = ws.write('2', 'utf8', () => {
//   console.log('写入成功')
// })
// console.log('写入成功')

// flag = ws.write('3', 'utf8', () => {
//   console.log('写入成功')
// })
// console.log('写入成功')
//---------------------------------------------------------
let index = 0

function write() {
  let flag = true
  while (index < 10 && flag) {
    flag = ws.write(index++ + '', 'utf8', () => {
      console.log('写入成功')
    })
  }
  // if(index === 10){
  //     ws.end('遗言'); // == ws.write + ws.close();
  //     // ws.write('123');  write after end
  // }
}

ws.on('drain', function(params) {
  console.log('drain')
  write()
})

write()
