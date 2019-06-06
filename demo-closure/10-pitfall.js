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
console.log('-----------------坑2: this的指向--------------------------')