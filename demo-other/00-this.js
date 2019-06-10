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

/**
    * 闭包实现缓存
    * 属性:有个键--值   --->所以可以将缓存数据存放在一个对象中
    * 方法:缓存存储   setCache
    *      缓存的获取  getCache
    * */
function configCache () {
  var obj = {}// 设置一个内部的对象 用来存储缓存数据;这个属性是私有的
  // 对外暴露两个公共的方法
  return {
    setCache: function (k, v) { // 设置缓存
      obj[k] = v
    },
    getCache: function (k) { // 获取缓存
      return obj[k]
    }
  }
}
var conf = configCache()
console.log(conf)
conf.setCache(1, 'sdwqecwqv')
console.log(conf.getCache(1))// sdwqecwqv
/*
* 注意下面这种情况,两次configCache()会产生不同的执行环境
* */
configCache().setCache(1, 'sdwqecwqv')
console.log(configCache().getCache(1))// undefined
/*
* 使用立即执行函数
* */
var cacheConfig = (function () {
  var obj = {}
  return {
    setCache: function (k, v) {
      obj[k] = v
    },
    getCache: function (k) {
      return obj[k]
    }
  }
})()
