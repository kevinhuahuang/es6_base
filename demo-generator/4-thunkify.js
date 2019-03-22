// 使用thunkify库
/**
 * var Thunk = function (fn) {
 *   return function (..args) {
 *      return function (callback) {
 *          return fn.call(this, ...args, callback);
 *      }
 *   }
 * }
 */

const fs = require('fs')
const thunkify = require('thunkify')

const thunk = thunkify(fs.readFile)
const readFileThunk = thunk('../data.json', 'utf-8')
readFileThunk((err, data) => {
  console.log(data)
})
