let objPublic = {
  name: 'kevin',
  height: 175,
  weight: '70kg',
  age: 35,
  expect: {
    weight: '65kg'
  },
  [Symbol('hair')]: 'short'
}

console.log('------------------for in')
for (let key in objPublic) {
  console.log(key)
}

console.log('------------------Object.keys(obj)')
for (let key of Object.keys(objPublic)) {
  console.log(key)
}

console.log('------------------Object.values(obj)')
for (let key of Object.values(objPublic)) {
  console.log(key)
}

console.log('------------------Object.entries(obj) 键值对用数组保存')
for (let key of Object.entries(objPublic)) {
  console.log(key)
}

console.log('------------------Object.key(obj) 返回属性名组成的数组')
console.log(Object.keys(objPublic))
