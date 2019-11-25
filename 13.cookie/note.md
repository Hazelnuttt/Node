## cookie section localStorage sectionStorage 区别

- cookie section

- cookie 存于浏览器 4k 不能跨越
- section 基于 cookie 存于服务器 不存在跨域问题

- localStorage 存本地 不能跨域 5m
- sectionStorage 浏览器关掉销毁

- 普通的 cookie 操作很简单

```js
//设置
res.setHeader('Set-Cookie', ['name = hazelnut; path=/a', 'age=10'])
//取
req.headers['cookie']
```

- 追加签名
- 服务端有一把密钥，这把密钥就是根据内容，生成 `.`后面的一串。每次用密钥开内容，看内容是否改变。这把密钥肯定不能是 MD5，可以是`加盐算法`
