function Test () {
  this.a = 1
  b = 2
  Test.prototype.c = 111
}


Test.prototype.d = 222

let test1 = Test // 赋值构造函数的指针，等同于构造函数本身
let test2 = new Test()
let test3 = Test()  // 构造函数必须用new 来创建实例




console.log(test1)
console.log(test2)
console.log(test3)

console.log(test2.c)
console.log(test2.d)
console.log(test2.e)

Test.prototype.e = 222