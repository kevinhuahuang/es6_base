/*
Array.from(arrayLike[, mapFn[, thisArg]])
arrayLike: 想要转换成数组的伪数组对象或可迭代对象。
mapFn 如果指定了该参数，新数组中的每个元素会执行该回调函数。
thisArg 可选参数，执行回调函数 mapFn 时 this 对象。
返回值: 一个新的数组实例
* */

// 创建数组
let newAry = Array.from({ length: 6 }, () => { return 0 }) //  创建长度为6，元素都为0的数组 return 0 应该省略为 0
let newAryAry = Array.from({ length: 4 }, () => Array.from({ length: 9 }, () => 1)) // 创建[6][9]元素为1的二维数组
console.log('创建一维数组: ')
console.log(newAry)
console.log('创建二维数组: ')
console.log(newAryAry)

// 类似map的操作
let aryCallback = Array.from([4, 7, 0, 4], (value, index) => { return { index: index, value: value } })
console.log('类map操作：')
console.log(aryCallback)

// 将字符串转换为数组
let aryStr = Array.from('Hello  \r Kevin') // 空格也会转换，两个空格都转换, 特殊字符也被转换 \r
console.log('字符串转数组：')
console.log(aryStr)

// 将set结构的数据转换为真正的数组
let set = new Set(['kevin', 36, '175cm', '70kg'])
let arySet = Array.from(set)
console.log('set转换为数组： ')
console.log(arySet)

// 将map结构的数据转换为真正的数组
let map = new Map([[1, 2], [2, 4], [4, 8]])
let aryMap = Array.from(map)
console.log('map转换为数组： ')
console.log(aryMap)

// 将类数组对象转换为真正的数组
let arrayNotSimilar = {
  name: 'kevin',
  age: 35,
  weight: '70KG',
  height: '175cm',
  length: 4
}
let aryNotSimilar = Array.from(arrayNotSimilar)
console.log('非类数组对象转数组(返回空数组)：')
console.log(aryNotSimilar)

let arraySimilar = {
  0: 'kevin',
  2: 35, // 位于数组的第三位
  1: '70KG', // 位于数组的第二位
  3: '175cm',
  length: 4 // 必须指定长度，不指定长度，返回空数组
  // 指定长度比对象实际长度小，将截取
  // 指定长度比对象实际长度大，将用undefined补充
}
let arySimilar = Array.from(arraySimilar)
console.log('类数组对象转数组：')
console.log(arySimilar)

// 接受this为参数

// Array.from 参数是一个数组 返回一模一样的数组
