const http = require('http')
const crypto = require('crypto')
const secret = 'hazelnut'
const cardName = 'hazelnut'
const uuid = require('uuid')
let session = {}
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
      if (cookie) {
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

    if (req.url === '/visit') {
      let CardId = req.getCookie(cardName, { signed: true })
      if (CardId && session[CardId]) {
        session[CardId].visit++
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end(`这是第${session[CardId].visit}次来`)
      } else {
        let CardId = uuid.v4()
        res.setCookie(cardName, CardId, { signed: true })
        session[CardId] = {
          visit: 1
        }
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end(`这是第一次来`)
      }
    }
  })
  .listen(3000)

//方法封装
