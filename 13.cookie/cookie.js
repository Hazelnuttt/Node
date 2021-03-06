const http = require('http')
const crypto = require('crypto')
const secret = 'hazelnut'
const querystring = require('querystring')
const sign = value => {
  return crypto
    .createHmac('sha256', secret)
    .update(value)
    .digest('base64')
    .replace(/\=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}
http
  .createServer((req, res) => {
    req.getCookie = function(key, opts = {}) {
      let obj = require('querystring').parse(req.headers['cookie'], '; ')
      let cookie = obj[key]
      let [value, s] = cookie.includes('.') ? cookie.split('.') : [cookie]
      if (opts.signed) {
        // 如果有签名要检验
        if (sign(value) === s) {
          // 校验cookie的签名，如果没有更改说明值是服务端设置的
          return value
        } else {
          return ''
        }
      }
      return value
    }

    let cookies = []
    res.setCookie = function(key, value, opts = {}) {
      let cookie = `${key} = ${value}`
      let arr = []
      if (opts.httpOnly) {
        arr.push(`httpOnly = true`)
      }
      if (opts.maxAge) {
        arr.push(`max-age = ${opts.maxAge}`)
      }
      if (opts.domain) {
        arr.push(`domain=${opts.domain}`)
      }
      if (opts.signed) {
        cookie = cookie + '.' + sign(value)
      }

      cookies.push(`${cookie}; ${arr.join('; ')}`)
      res.setHeader('Set-Cookie', cookies)
    }

    if (req.url === '/read') {
      res.end(req.getCookie('name', { signed: true } || '空'))
      //   res.end(req.headers['cookie'] || '空')
    } else if (req.url === '/write') {
      //同域名下共享 domain
      //   res.setHeader('Set-Cookie', ['name=hazelnut; domain=".zf1.cn"', 'age=19'])
      //设置path  以这个路径开头
      //expires 过期 max-age=
      //httpOnly=true 在服务端设的客户端拿不到
      //   res.setHeader('Set-Cookie', ['name=hazelnut; path=/a ', 'age=19'])
      res.setCookie('name', 'hazelnut', { signed: true })
      res.setCookie('age', '19')
      res.end('write end')
    }
  })
  .listen(3000)

//方法封装
