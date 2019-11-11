// node 前端浏览器中的js ==> BOM DOM ECMASCRIPT
// ==> 为了写服务器/后端 ==> 内置模块 核心模块

//commonjs 规范
// 模块系统 1)如何使用模块 2)如何导出模块

//node 中模块的分类 1. 内置模块 2. 第三方模块
let path = require('path')
console.log(path.resolve(__dirname, 'a'))
console.log(path.join(__dirname, 'a', '/'))

let fs = require('fs')
let flag = fs.existsSync(path.resolve(__dirname, 'a.md'))
console.log(flag)
