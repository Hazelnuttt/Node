//node 自己封装了文件流
//1) 读取
//let buffer = Buffer.alloc(3)
let fs = require('fs')
// //打开文件
// fs.open('dist.txt', 'r', function(err, fd) {
//   if (err) {
//     return console.log(err)
//   }
//   fs.read(fd, buffer, 0, 3, 2, function(err, bytesRead) {
//     console.log(bytesRead)
//     console.log(buffer.toString())
//     fs.close(fd, function(err) {
//       console.log('关闭成功！')
//     })
//   })
// })

//2) 写入
// let buffer = Buffer.from('江苏大学')
// fs.open('dist.txt', 'w', function(err, fd) {
//   fs.write(fd, buffer, 3, 9, 0, function(err, written) {
//     console.log(written)
//     console.log(buffer.toString())
//   })
// })

//3) copy
//第一种
// let buffer = Buffer.alloc(9)
// function copy(source, target, callback) {
//   let readOffset = 0
//   let writeOffset = 0
//   fs.open(source, 'r', function(err, rfd) {
//     fs.open(target, 'w', function(err, wfd) {
//       fs.read(rfd, buffer, readOffset, 9, 0, function(err, bytesRead) {
//         fs.write(wfd, buffer, writeOffset, bytesRead, 0, function(err, written) {
//           callback()
//         })
//       })
//     })
//   })
// }

//第二种
function copy(source, target, callback) {
  //异步嵌套过深
  let buffer = Buffer.alloc(27)
  let readOffset = 0
  let writeOffset = 0
  fs.open(source, 'r', function(err, rfd) {
    fs.open(target, 'w', function(err, wfd) {
      //co
      function next() {
        fs.read(rfd, buffer, 0, buffer.length, readOffset, function(err, bytesRead) {
          readOffset += bytesRead
          if (bytesRead) {
            fs.write(wfd, buffer, 0, bytesRead, writeOffset, function(err, written) {
              writeOffset += written
              next()
            })
          } else {
            fs.close(rfd, function() {})
            fs.close(wfd, function() {})
            callback()
          }
        })
      }
      next()
    })
  })
}

copy('./dist.txt', './copy.txt', function() {
  console.log('拷贝成功！')
})
