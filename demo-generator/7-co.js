// co库
const fs = require('fs')
const thunkify = require('thunkify')

const co = require('co')
const readFileThunk = thunkify(fs.readFile)

const gen = function * () {
  const r1 = yield readFileThunk('../data1.json')
  console.log(r1.toString())
  const r2 = yield readFileThunk('../data2.json')
  console.log(r2.toString())
}

const c = co(gen) // 返回的是一个Promise对象
c.then(data => {
  console.log(data) // undefined
  console.log('结束')
})
