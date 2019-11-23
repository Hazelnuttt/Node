const http = require('http')
http
  .createServer((req, res) => {
    req.getCookie = function(key) {
      let obj = require('querystring').parse(req.headers['cookie'], '; ')
      return obj[key]
    }

    let cookies = []
    res.setCookie = function(key, value, opts = {}) {
      let arr = []
      if (opts.httpOnly) {
        arr.push(`httpOnly = true`)
      }
      if (opts.maxAge) {
        arr.push(`max-age = ${opts.maxAge}`)
      }

      cookies.push(`${key} = ${value}; ${arr.join('; ')}`)
      res.setHeader('Set-Cookie', cookies)
    }

    if (req.url === '/a/read') {
      res.end(reg.getCookie(name))
      //   res.end(req.headers['cookie'] || '空')
    } else if (req.url === '/a/write') {
      //同域名下共享 domain
      //   res.setHeader('Set-Cookie', ['name=hazelnut; domain=".zf1.cn"', 'age=19'])
      //设置path  以这个路径开头
      //expires 过期 max-age=
      //httpOnly=true 在服务端设的客户端拿不到
      //   res.setHeader('Set-Cookie', ['name=hazelnut; path=/a ', 'age=19'])
      res.setCookie('name', 'hazelnut', { httpOnly: true })
      res.setCookie('age', '19')
      res.end('write end')
    }
  })
  .listen(3000)

//方法封装
