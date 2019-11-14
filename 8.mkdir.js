let fs = require('fs')

//同步创建目录
// function mkdirSync(p) {
//   let arr = p.split('/')
//   for (let i = 0; i < arr.length; i++) {
//     let current = arr.slice(0, i + 1).join('/')
//     if (!fs.existsSync(current)) {
//       fs.mkdirSync(current)
//     }
//   }
// }

// mkdirSync('a/b/c/d')

//异步创建目录
//只要是异步递归，就是 function next

function mkdir(p) {
  let arr = p.split('/')
  let index = 0
  function next() {
    let current = arr.slice(0, index++).join('/')
    fs.stat(current, function(err) {
      if (err) {
        fs.mkdir(current, function() {
          next()
        })
      } else {
        next()
      }
    })
  }
  next()
}
mkdir('e/f/g/h')
