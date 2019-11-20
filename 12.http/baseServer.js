const http = require('http')
const port = 3000

http
  .createServer(function(req, res) {
    //接受请求
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.end(JSON.stringify({ name: 'www' }))
    let arr = []
    req.on('data', function(chunk) {
      arr.push(chunk)
    })

    req.on('end', function(params) {
      console.log(Buffer.concat(arr).toString())
      res.end(JSON.stringify({ name: 'www' }))
    })
    // let contentType = req.headers['content-type']
    // res.setHeader('Content-Type', 'application/json;charset=utf-8') //服务器返回给我的都是json//客户端返给服务器的不知道
    // let arr = []
    // req.on('data', function(chunk) {
    //   //chunk 可能是 buffer 或是 string
    //   arr.push(chunk)
    // })
    // req.on('end', function(req, res) {
    //   let str = Buffer.concat(arr).toString()
    //   if (contentType === 'application/json') {
    //     let obj = JSON.parse(str)
    //     res.end(obj.name)
    //   } else if (contentType === 'application/x-www-form-urlencoded') {
    //     let obj = {}
    //     str.replace(/([^&]+)=([^&]+)/g, function() {
    //       obj[arguments[1]] = arguments[2]
    //     })
    //     console.log(obj)
    //   } else {
    //     res.end('not support')
    //   }
    // })
  })
  .listen(port, function() {
    console.log('server start ' + port)
  })
