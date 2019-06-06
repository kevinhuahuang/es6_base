let aryPublic = ['a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', , , 'a9', 'a10', 'a11']

// find 返回第一个符合条件的元素
console.log('----------find')
console.log(aryPublic.find((value, index, ary) => {
  return value > 3 // 当true时返回
}))

// findIndex 返回第一个符合条件的元素的index
console.log('----------findIndex start from 0')
console.log(aryPublic.findIndex((value, index, ary) => {
  return value > 3 // 当true时返回
}))

// ==============================================================
// for of --keys()  values() entries()
console.log('----------keys')
for (let index of aryPublic.keys()) {
  console.log('index:' + index)
}

// for (let value of aryPublic.values()) { // 会报错，支持度不高
//   console.log('value:' + value)
// }

console.log('----------entries 键值对保存为数组')
for (let entry of aryPublic.entries()) {
  console.log(entry)
}

console.log('----------entries  index : value')
for (let [index, value] of aryPublic.entries()) {
  console.log(index + ' : ' + value)
}

// ==============================================================
// forEach
console.log('----------forEach 跳过空值---------')
let indexAry = []
let valueAry = []
aryPublic.forEach((value, index, ary) => { // 跳过空值，但空值占用index
  indexAry.push(index) // 缺少6，7两个空值占用的index
  valueAry.push(value)
})

console.log(indexAry)
console.log(valueAry)
// ==============================================================
// every some filter map
console.log('----------every----------')
console.log(aryPublic.every((value, index, ary) => {
  return value > 1
}))

console.log('----------some---------')
console.log(aryPublic.some((value, index, ary) => {
  return value > 10
}))

console.log('----------filter')
console.log(aryPublic.filter((value, index, ary) => { // 返回符合条件的元素组成的数组
  return value > 5
}))

console.log('----------map')
console.log(aryPublic.map((value, index, ary) => {
  return value + ''
}))
