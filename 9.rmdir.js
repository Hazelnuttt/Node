let fs = require('fs')
let path = require('path')

// 同步删除所有文件夹
//同步就是循环

function rmdirSync(dir) {
  // 只有当前文件夹的子节点 dirs
  let dirs = fs.readdirSync(dir) // 先读取自己的儿子
  dirs = dirs.map(d => path.join(dir, d)) // 把路径进行拼接
  // 遍历目录删除
  for (let i = 0; i < dirs.length; i++) {
    // 删除自己的儿子
    let current = dirs[i]
    let statObj = fs.statSync(current)
    if (statObj.isDirectory()) {
      // 如果是文件夹就删除文件夹
      fs.rmdirSync(current)
    } else {
      //文件就删除文件
      fs.unlinkSync(current)
    }
  }
  fs.rmdirSync(dir)
}
// rmdirSync('e')

//-------------------------------------------------------------------

function rmdirSync(p) {
  let dirs = fs.readdirSync(p)
  dirs = dirs.map(d => path.join(p, d))
  console.log(p)
  for (let i = 0; i < dirs.length; i++) {
    console.log(i)
    console.log(dirs.length)
    let current = dirs[i]
    let statObj = fs.statSync(current)
    if (statObj.isDirectory()) {
      if (i == dirs.length) {
        return fs.rmdirSync(p)
      }
      rmdirSync(current)
    } else {
      fs.unlinkSync(current)
    }
  }
  fs.rmdirSync(p)
}
// rmdirSync('e')
//---------------------------------------------------------------------------------
//异步 串行 先序深度遍历
function rmdir(p, cb) {
  fs.stat(p, function(err, statObj) {
    if (statObj.isDirectory()) {
      fs.readdir(p, function(err, dirs) {
        dirs = dirs.map(dir => path.join(p, dir))
        let index = 0
        function next() {
          if (index === dirs.length) {
            return fs.rmdir(p, cb)
          }
          let current = dirs[index++]
          rmdir(current, next)
        }
        next()
      })
    } else {
      fs.unlink(p, cb)
    }
  })
}

// rmdir('e', function() {
//   console.log('删除成功')
// })
//-----------------------------------------------------------------------------------------
//异步并行
function rmdir(p) {
  return new Promise((resolve, reject) => {
    fs.stat(p, function(err, statObj) {
      if (statObj.isDirectory()) {
        fs.readdir(p, function(err, dirs) {
          dirs = dirs.map(d => rmdir(path.join(p, d))) //一边遍历，一边删除
          Promise.all(dirs).then(() => {
            fs.rmdir(p, resolve)
          })
        })
      } else {
        fs.unlink(p, resolve)
      }
    })
  })
}
// rmdir("e").then(function() {
//   console.log("删除成功");
// });
//-------------------------------------------------------------------------------------------
//广度遍历 同步
function wideRmdirSync(p) {
  let arr = [p]
  let index = 0
  let current
  while ((current = arr[index++])) {
    let statObj = fs.statSync(current)
    if (statObj.isDirectory()) {
      let dirs = fs.readdirSync(current).map(d => path.join(current, d))
      arr = [...arr, ...dirs]
    }
  }
  console.log(arr)
}
// wideRmdirSync('a')
