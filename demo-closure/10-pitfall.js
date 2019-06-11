/**
 * 坑1: 引用的变量在执行与定义时值不一致
 * */
console.log('-----------------坑1: 引用的变量在执行与定义时值不一致--------------------------')
function outer () {
  var result = []
  for (let i = 0; i < 5; i++) { // var改为let，将输出0，1，2，3，4
    result[i] = function () { // for循环的时候函数并非立即执行，而是在外部函数之外对其调用的时候再运行，那时，i的值只有一个且是5
      return i
    }
  }
  return result // 返回5个Function组成的数组
}

let outer1 = outer()
console.log(outer1[0]()) // 5 此时才会执行闭包函数
console.log(outer1[1]()) // 5
console.log(outer1[2]()) // 5
console.log(outer1[3]()) // 5
console.log(outer1[4]()) // 5

/**
 * 解决方法：
 * 1. for循环中的var改为let
 * 2. 使用匿名立即执行函数
 * */
console.log('-----------解决方法------------')
function outerFix () {
  var result = []
  for (var i = 0; i < 5; i++) {
    result[i] = (function (index) {
      return function () {
        return index // index是所在函数的变量，每个函数中的index都是独立的
      }
    }(i))
  }
  return result
}

let outerFix1 = outerFix()
console.log(outerFix1[0]()) // 0
console.log(outerFix1[1]()) // 1
console.log(outerFix1[2]()) // 2
console.log(outerFix1[3]()) // 3
console.log(outerFix1[4]()) // 4

/**
 * 坑2: this的指向
 * */
console.log('----------------this指向-------------------')
global.scope = 'global_scope' // 运行在node.js上，全局作用域是global而不是window
function getScope () {
  let scope = 'function_scope'
  return this.scope // 函数的this指向全局作用域(但用new创建的对象时this反向实例对象)
}
console.log(getScope()) // 'global_scope'

let object = {
  scope: 'object_scope',
  getName: function () { // 函数中的函数
    return function () {
      this.scope = 'change_scope' // 修改了全局作用域下的scope变量
      return this.scope
    }
  }
}
console.log(object.getName()()) // change_scope
console.log(getScope()) // change_scope
// 因为里面的闭包函数是在全局作用域下执行的，也就是说，this指向全局作用域
/**
 * 坑3: 内存泄露(现在的浏览器似乎不会)
 * */
console.log('-------------------内存泄露------------------------')
/**
 * 当点击这个元素时，改变元素颜色后，el不会被释放，
 * 因为el的引用不小心被放在一个匿名内部函数中。在这个内部函数(在全局中被调用)和本地对象之间（el）创建了一个循环引用。
 */
function changeColor () {
  var el = document.getElementById('changeColor')
  el.onclick = function () {
    el.style.color = 'blue'
  }
}
console.log('-----------解决方法0：手动在函数尾部将变量置为null,解除变量对内存的引用，内存将被释放-----------')
console.log('-----------解决方法1：不使用变量------------')
function changeColorFix1 () {
  document.getElementById('changeColor').onclick = function () {
    this.style.color = 'blue'
  }
}

console.log('-----------解决方法2：匿名立即执行函数-----------')
function changeColorFix2 () {
  var clickHandler = function () {
    this.style.backgroundColor = 'blue'
  };
  (function () { // 匿名立即执行函数，执行完即进行垃圾回收
    var el = document.getElementById('changeColor')
    el.onclick = clickHandler
  })()
}
