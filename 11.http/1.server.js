// let url = require('url')
// let urlStr = 'http://username:password@www.zhufeng.cn:80/user?a=1#aaa'
// let urlObj = url.parse(urlStr, true)
// console.log(urlObj)

//1)浏览器充当客户端 ==> 访问服务器
let http = require('http')
let url = require('url')
let port = 3000
let server = http
  .createServer(function(req, res) {
    console.log('请求来了1')

    let arr = []
    req.on('data', function(chunk) {
      arr.push(chunk)
    })

    req.on('end', function() {
      console.log(Buffer.concat(arr).toString())
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain;charset=utf-8')
      res.end('结束了')
    })
  })
  .listen(port, function() {
    console.log('server start' + port)
  })

// server.on('request', function(req, res) {
//   console.log('请求来了2')
// })

server.on('error', function(err) {
  if (err.errno === 'EADDRINUSE') {
    port++
    server.listen(port)
  }
})
