const http = require('http')
const port = 3000

http
  .createServer(function(req, res) {
    let contentType = req.headers['content-type']
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    let arr = []
    req.on('data', function(chunk) {
      arr.push(chunk)
    })

    req.on('end', function() {
      let str = Buffer.concat(arr).toString()
      if (contentType === 'application/json') {
        let obj = JSON.parse(str)
        res.end(obj.name)
      } else if (contentType === 'application/x-www-form-urlencoded') {
        let obj = {}
        str.replace(/([^&]+)=([^&]+)/g, function() {
          obj[arguments[1]] = arguments[2]
        })
        res.end(obj.name)
      } else {
        res.end('not support')
      }
    })
  })
  .listen(port, function() {
    console.log('server start' + port)
  })
