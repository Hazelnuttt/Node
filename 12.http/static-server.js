const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')
const port = 3000

http
  .createServer(function(req, res) {
    let { pathname } = url.parse(req.url) //这个pathname 就是端口号后面的
    let absPath = path.join(__dirname, 'src', pathname)
    console.log(absPath)
    fs.stat(absPath, function(err, statObj) {
      if (err) {
        return res.end('Not Found')
      }
      if (statObj.isDirectory()) {
        absPath = path.join(absPath, 'index.html')
        fs.stat(absPath, function(err, statObj) {
          if (err) {
            return res.end('Not Found')
          }
          res.setHeader('Content-Type', 'text/html;charset=utf-8')
          fs.createReadStream(absPath).pipe(res)
        })
      } else {
        res.setHeader('Content-Type', mime.getType(absPath) + ';charset=utf-8') //mime 模块
        //生成一个可读流,读出来之后要写出来
        fs.createReadStream(absPath).pipe(res) // 会默认调用可写流的write和end方法
      }
    })
  })
  .listen(port, function() {
    console.log('server start ' + port)
  })

//===> TODO: 解决代码嵌套问题
