//readFile readFileSync
//writeFile writeFileSync
let path = require('path')
let fs = require('fs')

fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8', function(err, data) {
  if (
    err => {
      return console.log(err)
    }
  )
    fs.writeFile(path.resolve(__dirname, 'copy.txt'), data, function(err) {
      if (err) {
        return console.log(err)
      }
      console.log('写入成功！')
    })
})

let arr = Buffer.from('江苏大学')
arr = arr.toString()
console.log(arr)

//文件写进去的是utf8，但是展示出来的是经过toString的
