/**
 * 函数无返回值
 * */
console.log('-----------------------函数无返回值----------------------------')
function Person (str) {
  let nation = 'china'
  this.name = str
  Person.prototype.kind = 'human'
}

let kevin = Person('kevin')
console.log(kevin) // undefined
// console.log(kevin.kind) // 报错 Cannot read property 'kind' of undefined 因为kevin为undefined
// console.log(kevin.nation) // 报错 Cannot read property 'nation' of undefined 因为kevin为undefined
let shirley = new Person('shirley')
console.log(shirley) // person { name: 'shirley' }
console.log(shirley.kind) // human
console.log(shirley.nation) // undefined

/**
 * 函数返回一个基本类型（非对象）
 * */
console.log('---------------------函数返回一个基本类型（非对象）----------------------')
function Person1 (str) {
  let nation = 'china'
  this.name = str
  Person1.prototype.kind = 'human'
  return 'human'
}

let kevin1 = Person1('kevin')
console.log(kevin1) // human
console.log(kevin1.kind) // undefined 不报错，因为kevin1非undefined
let shirley1 = new Person1('shirley')
console.log(shirley1) // Person1 { name: 'kevin' }
console.log(shirley1.kind) // human
console.log(shirley.nation) // undefined
/**
 * 函数返回一个对象
 * */
console.log('---------------------函数返回一个对象----------------------')
function Person2 (str) {
  let nation = 'china'
  this.name = str
  Person2.prototype.kind = 'human'
  return { Person_name: name }
}

let kevin2 = Person2('kevin')
console.log(kevin2) // { Person_name: 'kevin' }
console.log(kevin2.kind) // undefined 不报错，因为kevin2非undefined
let shirley2 = new Person2('shirley')
console.log(shirley2) // { Person_name: 'kevin' } 与无new一样，据说里面this的指向不一样
console.log(shirley2.kind) // undefined
console.log(shirley2.nation) // undefined

console.log('---------------------区别----------------------')
let kevin3 = { // 简单对象
  name: 'kevin3'
}
console.log(kevin3) // { name: 'kevin3' }
console.log(kevin3.name) // kevin3

function vivian () {
  let name = 'unknow'
}
console.log(vivian) // [Function: vivian]
console.log(vivian.name) // 返回的是函数的名字，并不是变量name的值
console.log(vivian()) // undefined
// console.log(vivian().name) // 报错 Cannot read property 'name' of undefined

/** 无法直接new 一个对象
let shirley3 = new { // 报错：is not a constructor
  name: 'shirley3'
}
*/
let shirley3 = new function () {
  this.name = 'shirley3'
}() // 如果函数带参数从此处传入
console.log(shirley3) // { name: 'shirley3' }
console.log(shirley3.name) // shirley3
