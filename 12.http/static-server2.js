//解决嵌套
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const { createReadStream, createWriteStream } = require('fs')
const mime = require('mime')

class Server {
  /**
   *
   * @param  {...any} args 端口号
   * @function handleRequest 处理请求的方法
   * @function sendError 处理文件找不到的错误
   * @function sendFile 处理文件
   */
  handleRequest(req, res) {
    //处理路径
    let { pathname } = url.parse(req.url)
    let absPath = path.join(__dirname, pathname)
    console.log(absPath)
    try {
      //判断文件夹还是文件
      fs.stat(absPath, (err, statObj) => {
        if (statObj.isFile()) {
          this.sendFile(absPath, req, res)
        } else {
        }
      })
    } catch (e) {
      console.log(e)
      this.sendError(e, res)
    }
  }

  sendFile(currentPath, req, res) {
    //可以是文件流，也可以文件读写
    res.setHeader('Content-Type', mime.getType(currentPath) + ';charset=utf-8')
    createReadStream(currentPath).pipe(res)
  }
  sendError(err, res) {
    res.statusCode = 404
    res.end('Not Found')
  }
  start(...args) {
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args, function() {
      console.log('server start ' + args)
    })
  }
}

module.exports = Server

let server = new Server()
server.start(3000)
