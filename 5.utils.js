const util = require('util')
const fs = require('fs')
import javascript from 'highlight.js/lib/languages/javascript'
import hljs from 'highlight.js/lib/highlight'
import 'highlight.js/styles/github.css'
hljs.registerLanguage('javascript', javascript)

//inherits 继承
//isArray isBoolean 判断类型

//将回调的方式转换成promise的方法
// fs.readFile('./name.txt', 'utf8', function(err, data) {})
function promisify(fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, function(err, data) {
        if (err) reject(err)
        resolve(data)
      })
    })
  }
}

let read = promisify(fs.readFile)
// let read = util.promisify(fs.readFile)
read('./name.txt', 'utf8').then(data => {
  console.log(data)
})
