let objPublic = {
  name: 'kevin',
  height: 175,
  weight: '70kg',
  age: 35,
  expect: {
    weight: '65kg'
  }
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

Object.keys(objPublic).forEach((value, key, obj))