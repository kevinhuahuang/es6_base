let aryPublic = [1, 2, 3, 4, 5, 6, , , 7, 8, 9, 10, 11]

// find 返回第一个符合条件的元素
console.log(aryPublic.find((value, index, ary) => {
  return value > 3
}))

// findIndex 返回第一个符合条件的元素的index
console.log(aryPublic.findIndex((value, index, ary) => {
  return value > 3
}))

// ==============================================================
// for of --keys()  values() entries()
for (let index of aryPublic.keys()) {
  console.log('index:' + index)
}

// for (let value of aryPublic.values()) { // 会报错，支持度不高
//   console.log('value:' + value)
// }

for (let entry of aryPublic.entries()) {
  console.log('entry:' + entry)
}

for (let [index, value] of aryPublic.entries()) {
  console.log(index + ' : ' + value)
}

// ==============================================================
// every some filter map
console.log(aryPublic.every((value, index, ary) => {
  return value > 1
}))

console.log(aryPublic.some((value, index, ary) => {
  return value > 10
}))

console.log(aryPublic.filter((value, index, ary) => {
  return value > 5
}))

console.log(aryPublic.map((value, index, ary) => {
  return value + ''
}))
