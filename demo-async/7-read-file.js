// 依次读取两个文件
const fs = require('fs')

let readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (error, data) {
      if (error) reject(error)
      resolve(data)
    })
  })
}

// Generator函数形式
// let gen = function* () {
//     let f1 = yield readFile('data1.json')
//     let f2 = yield readFile('data2.json')
//     console.log(f1.toString())
//     console.log(f2.toString())
// }
//
// co(gen)

// async函数形式
let asyncReadFile = async function () {
  let f1 = await readFile('../data1.json')
  let f2 = await readFile('../data2.json')
  console.log(f1.toString())
  console.log(f2.toString())
}

asyncReadFile()
