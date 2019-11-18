let EventEmitter = require('events')
let fs = require('fs')

module.exports = class ReadStream extends EventEmitter {
  constructor(path, options) {
    super()
    this.path = path
    this.flags = options.flags || 'r'
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.start = options.start || 0
    this.end = options.end
    this.autoClose = options.autoClose || true

    this.flowing = false //默认非流动模式
    this.pos = this.start

    this.open() //只要创建可读流就会打开这个文件。 它是个什么事件来着？？？

    //监听data事件
    this.on('newListener', function(type) {
      if (type === 'data') {
        this.flowing = true
        this.read()
      }
    })
  }

  //关闭文件 报错
  destroy(err) {
    if (this.autoClose) {
      if (typeof this.fd === 'number') {
        fs.close(this.fd, () => {
          this.emit('close')
        })
      }
      if (err) {
        this.emit('error')
      }
    }
  }

  pipe(ws) {
    this.on('data', chunk => {
      let flag = ws.write(chunk)
      if (!flag) {
        this.pause()
      }
    })
    this.on('end', () => {
      ws.end()
    })
    ws.on('drain', () => {
      this.resume()
    })
  }

  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        return this.destroy(err)
      }
      this.fd = fd //存起来
      this.emit('open', fd) // 发布事件
    })
  }

  read() {
    if (typeof this.fd !== 'number') {
      //这里有点问题
      return this.once('open', () => {
        this.read()
      })
    }
    let buffer = Buffer.alloc(this.highWaterMark) //buffer 是不可能共用的 只能定义在内部
    //计算每次读取多少个
    let howMuchToRead = this.end ? (this.end - this.pos + 1, buffer.length) : buffer.length
    fs.read(this.fd, buffer, 0, howMuchToRead, this.pos, (err, bytesRead) => {
      if (err) {
        return this.destroy(err)
      }
      if (bytesRead) {
        this.pos += bytesRead
        this.emit('data', buffer.slice(0, bytesRead)) //一边读取，一边发布，buffer 很长，需要截取有效长度
        if (this.flowing) {
          this.read()
        }
      } else {
        this.emit('end')
        this.destroy() //关闭文件
      }
    })
  }

  resume() {
    this.flowing = true
    this.read()
  }
  pause() {
    this.flowing = false
  }
}
