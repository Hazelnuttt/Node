const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs').promises
const { createReadStream, createWriteStream } = require('fs')

http
  .createServer(async (req, res) => {
    let { pathname } = url.parse(req.url)
    let absPath = path.join(__dirname, pathname)
    try {
      //1) 先静态文件
      let statObj = await fs.stat(absPath)
      if (statObj.isFile()) {
        createReadStream(absPath).pipe(res)
        console.log(absPath)
      } else {
        res.statusCode = 404
        return res.end('Not Found')
      }
    } catch (e) {
      //2) 有可能是api接口 restful风格、
      if (pathname === '/user') {
        switch (req.method) {
          case 'Get':
            return res.end(JSON.stringify({ name: 'zf' }))
            break

          default:
            break
        }
      }
      res.statusCode = 404
      return res.end('Not Found')
    }
  })
  .listen(3000)
