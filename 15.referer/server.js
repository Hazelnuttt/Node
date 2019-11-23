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
      // 先静态文件
      let statObj = await fs.stat(absPath)
      let whiteList = ['zf2.cn', 'zf1.cn']
      if (statObj.isFile()) {
        if (pathname.match(/jpg/)) {
          let referer = req.headers['referer'] || req.headers['referrer']
          if (referer) {
            let host = req.headers['host'].split(':')[0]
            referer = url.parse(referer).hostname
            if (host !== referer && !whiteList.includes(referer)) {
              createReadStream(path.resolve(__dirname, './sad.jpg')).pipe(res)
              return
            }
          }
        }
        createReadStream(absPath).pipe(res)
        console.log(absPath)
      } else {
        res.statusCode = 404
        return res.end('Not Found')
      }
    } catch (e) {
      res.statusCode = 404
      return res.end('Not Found')
    }
  })
  .listen(3000)
