/**
 * 1.函数中的this： 指向全局
 * */
global.thisMark = 'global_this'
function funcitonThis () {
  // 如果在函数内修改this.thisMark 修改的是全局的thisMark
  return this.thisMark
}

console.log(funcitonThis())

/**
 * 2.对象中方法的this： 指向对象
 * */
let myObject = {
  thisMark: 'object_this',
  getThis: function (num) {
    return this.thisMark
  }
}

console.log(myObject.getThis()) // object_this

/**
 * 3.new新建一个函数对象,this： 指向实例对象
 * */
function FunctionNew () {
  this.thisMark = 'object_this'
}

let objectNew = new FunctionNew()
console.log(objectNew.thisMark) // object_this
console.log(global.thisMark) // global_this
