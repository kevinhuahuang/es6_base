/* 首先
*一张图看懂Function和Object的关系及简述instanceof运算符
*https://www.cnblogs.com/shuiyi/p/5343399.html
*
*
* */
// Function 与 Object的 instanceof操作
// instanceof只是检测一个对象是否是另个对象new出来的实例
console.log('Function 与 Object的 instanceof操作')
console.log(Function instanceof Object) // true
console.log(Object instanceof Function) // true

console.log('构造器Function的构造器是它自身')
console.log(Function.constructor === Function)

console.log('构造器Object的构造器是Function（由此可知所有构造器的constructor都指向Function）')
console.log(Object.constructor === Function)

console.log('构造器Function的__proto__是一个特殊的匿名函数function() {}')
console.log(Function.__proto__)

console.log('这个特殊的匿名函数的__proto__指向Object的prototype原型。')
console.log(Function.__proto__.__proto__ === Object.prototype)

console.log('Object的__proto__指向Function的prototype，也就是上面所述的特殊匿名函数')
console.log(Object.__proto__ === Function.prototype)
console.log(Function.prototype === Function.__proto__)

// 我们回过头来看第一部分那个“奇怪的现象”，从上面那个图中我们可以看到：
console.log('回到开头')
console.log(Function.__proto__.__proto__ === Object.prototype) // true
console.log(Object.__proto__ === Function.prototype) // true



/*
* 总结：
* 1、所有的构造器的constructor都指向Function
* 2、Function的prototype指向一个特殊匿名函数，而这个特殊匿名函数的__proto__指向Object.prototype
* */













/*
* //假设instanceof运算符左边是L，右边是R
L instanceof R
//instanceof运算时，通过判断L的原型链上是否存在R.prototype
L.__proto__.__proto__ ..... === R.prototype ？
//如果存在返回true 否则返回false
注意：instanceof运算时会递归查找L的原型链，即L.__proto__.__proto__.__proto__.__proto__...直到找到了或者找到顶层为止。

所以一句话理解instanceof的运算规则为：

instanceof检测左侧的__proto__原型链上，是否存在右侧的prototype原型。
*/