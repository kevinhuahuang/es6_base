/**
 * 定义：当一个内部函数被其外部函数之外的变量引用时，就开成了一个闭包
 * 按如下的实例翻译过来就是 函数A的内部函数B被函数A外的一个变量C引用
 * */
console.log('-----------当一个内部函数被其外部函数之外的变量引用时，就开成了一个闭包-------------')
function A () {
  function B () {
    console.log('Hello World!')
  }
  return B
}
let C = A()
C()// Hello World!

/**
 * 闭包用途1：修改和获取函数内的值（只能通过函数的方法才能修改和获取函数变量的值）
 * */
console.log('--------------------闭包用途1：实现封装 立即执行函数----------------------------')
let people = (function (str) {
  globalName = 'I am global' // 注意 会被定义为全局变量
  let myName = str // 私有变量
  let kind
  function setKind (str) { // 私有函数
    kind = str
  }
  function getKind () { // 私有函数
    return kind
  }
  return {
    sex: 'man', // 公有变量
    setName: function (name) {
      myName = name
    },
    getName: function () {
      setKind('human')
      let str = getKind() + ' : ' + myName
      return str
    }
  }
})('hua') // 注意要写成立即执行行数
console.log(people) // { sex:'man', setName: [Function: setName], getName: [Function: getName] }
// console.log(people('kevin'))  // 报错 people is not a function
console.log(globalName) // 'I am global' globalName是全局变量
console.log(people.globalName) // undefined globalName是全局变量
console.log(people.myName) // undefined
// people.setKind('animal') 报错 people.setKind is not a function
console.log(people.getName()) //  human : 'hua'
people.setName('kevin')
console.log(people.getName()) // human : kevin
// let vivian = people('vivian') // 报错 people is not a function

console.log('--------------------闭包用途2：实现面向对象中的对象 非立即执行函数----------------------------')
function person (str) {
  this.kind = 'human'
  let myName = str // 私有变量
  return { // 每调用一次 都新建一个对象
    sex: 'man', // 公有变量
    setName: function (name) {
      myName = name
    },
    getName: function () {
      return myName
    }
  }
}

/**
 * 定义的两个对象 kevin shirley 作用域独立
 * */
console.log(person('hua')) // { sex: 'man',setName: [Function: setName],getName: [Function: getName] }
let kevin = person('kevin') // 不需要使用new，因为函数返回的就是一个对象
console.log(kevin.myName) // undefined
console.log(kevin.kind) // undefined
console.log(kevin.sex)
console.log(kevin.getName()) // kevin
let shirley = new person('shirley') // 可以使用new，与不使用new的区别据说是this的指向，未验证
shirley.sex = 'female' // 直接修改返回对象的值
console.log(shirley.kind) // undefined
console.log(shirley.sex) // female
console.log(shirley.getName()) // shirley
kevin.setName('hua')
console.log(kevin.getName()) // hua
console.log(shirley.getName()) // shirley

/**
 * 注意点1：返回函数不要引用任何循环变量，或者后续会发生变化的变量。
 * */
console.log('--------------------返回函数引用循环变量，后续会发生变化的变量----------------------------')
function count () {
  var arr = []
  for (var i = 1; i <= 3; i++) {
    arr.push(function () { // 非立即执行函数，在外部被调用才执行，到那时i=4
      return i * i
    })
  }
  return arr
}

let results = count()
let f1 = results[0]
let f2 = results[1]
let f3 = results[2]
console.log(f1()) // 16
console.log(f2()) // 16
console.log(f3()) // 16
/**
 * 返回的函数引用了变量i，但它并非立刻执行。等到3个函数都返回时，它们所引用的变量i已经变成了4，因此最终结果为16。
 * 如果将count函数内for循环的var改为let。显示的是 1，4，9
 * */
console.log('--------------------返回函数不要引用任何循环变量，使用带参数的立即函数将循环变量传进去----------------------------')
function countFix () {
  var arr = []
  for (var i = 1; i <= 3; i++) {
    arr.push((function (n) {
      return function () {
        return n * n
      }
    })(i))
  }
  return arr
}

let resultsFix = countFix()
let fix1 = resultsFix[0]
let fix2 = resultsFix[1]
let fix3 = resultsFix[2]
console.log(fix1()) // 16
console.log(fix2()) // 16
console.log(fix3()) // 16
