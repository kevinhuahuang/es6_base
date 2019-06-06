// Object.assign(target, ...sources)
/*
* 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。
    Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的[[Get]]和目标对象的[[Set]]，
    所以它会调用相关 getter 和 setter。因此，它分配属性，
    而不仅仅是复制或定义新的属性。如果合并源包含getter，这可能使其不适合将新属性合并到原型中。
    为了将属性定义（包括其可枚举性）复制到原型，应使用Object.getOwnPropertyDescriptor()和Object.defineProperty() 。
    String类型和 Symbol 类型的属性都会被拷贝。
    在出现错误的情况下，例如，如果属性不可写，会引发TypeError，如果在引发错误之前添加了任何属性，则可以更改target对象。
    注意，Object.assign 不会跳过那些值为 null 或 undefined 的源对象。
*/

// --------------------------------------------------------------
// 复制一个源对象
const objSource = { a: 1 }
const objCopy = Object.assign({}, objSource)
console.log('复制一个源对象')
console.log(objCopy)

// --------------------------------------------------------------
// 合并对象
const objSource1 = { a: 1 }
const objSource2 = { b: 2 }
const objSource3 = { c: 3 }
const objMerge = Object.assign({}, objSource1, objSource2, objSource3) // 使用空对象为目标对象，其它对象不会被修改
console.log('合并对象')
console.log(objMerge)
console.log(objSource1)

// --------------------------------------------------------------
// 合并具有相同属性的对象 后面替换掉前面的
const objSource01 = { a: 1, b: 1, c: 1 }
const objSource02 = { b: 2, c: 2 }
const objSource03 = { c: 3 }
const objMergeSame = Object.assign({}, objSource01, objSource02, objSource03)
console.log('合并具有相同属性的对象')
console.log(objMergeSame)

// --------------------------------------------------------------
// 不能拷贝继承属性和不可枚举
const objSpecial = Object.create({ foo: 1 }, { // foo:1是继承属性
  bar: {
    value: 2 // bar 是个不可枚举属性
  },
  baz: {
    value: 3,
    enumerable: true // 可枚举属性
  }
})

const objCopySpecial = Object.assign({}, objSpecial)
console.log('不能拷贝继承属性和不可枚举')
console.log(objCopySpecial)

// --------------------------------------------------------------
// 原始类型会被包装为对象
const str = 'abc' // 被包装为对象 { '0': 'a', '1': 'b', '2': 'c' }
const boolea = true // 被忽略
const num = 10 // 被忽略
const sampl = Symbol('foo') // 被忽略
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
const originToObj = Object.assign({}, str, null, boolea, undefined, num, sampl)
console.log('原始类型会被包装为对象')
console.log(originToObj)

// --------------------------------------------------------------
// 拷贝symbol类型的属性
const objNoSymbol = { a: 1 }
const ojbSymbol = { [Symbol('foo')]: 2 }

const copySymbol = Object.assign({}, objNoSymbol, ojbSymbol)
console.log('拷贝symbol类型的属性')
console.log(copySymbol)

// --------------------------------------------------------------
// 非深拷贝，拷贝属性值和对象的引用
// 针对深拷贝，需要使用其他办法，因为 Object.assign()拷贝的是属性值。
// 假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。
console.log('---------------非深拷贝，拷贝属性值和对象的引用------------')
let obj1 = { a: 0, b: { c: 0 } }
let obj2 = Object.assign({}, obj1)
console.log('obj2拷贝 ojb1内容')
console.log(JSON.stringify(obj2)) // { a: 0, b: { c: 0}}

obj1.a = 1
console.log('更改obj1.a = 1， obj2.a值不变')
console.log(JSON.stringify(obj1)) // { a: 1, b: { c: 0}}
console.log(JSON.stringify(obj2)) // { a: 0, b: { c: 0}}

obj2.a = 2
console.log('更改obj2.a = 2， obj1.a值不变')
console.log(JSON.stringify(obj1)) // { a: 1, b: { c: 0}}
console.log(JSON.stringify(obj2)) // { a: 2, b: { c: 0}}

obj2.b.c = 3
console.log('更改obj2.b.c = 3， obj1.b.c值同步改变')
console.log(JSON.stringify(obj1)) // { a: 1, b: { c: 3}}
console.log(JSON.stringify(obj2)) // { a: 2, b: { c: 3}}

obj1 = { a: 0, b: { c: 0 } }
let obj3 = JSON.parse(JSON.stringify(obj1))
obj1.a = 4
obj1.b.c = 4
console.log(JSON.stringify(obj3)) // { a: 0, b: { c: 0}}

// --------------------------------------------------------------
// 与扩展运算符...的比较，都是对象浅拷贝
let objBeCopy = { name: 'vivian', property: { age: 18 } }
let objDeepTemp = Object.assign({}, objBeCopy) // 对象浅拷贝
let objDeepCopy = { ...objBeCopy } // 对象浅拷贝
objBeCopy.name = 'kevin'
objBeCopy.property.age = 35
console.log('assign与扩展运算符...的比较')
console.log(objBeCopy)
console.log(objDeepTemp)
console.log(objDeepCopy)

// --------------------------------------------------------------
// 异常会打断拷贝任务

// --------------------------------------------------------------
// 拷贝访问器
const obj = {
  foo: 1,
  get bar () {
    return 2
  }
}

let copy = Object.assign({}, obj)
console.log(copy) // { foo: 1, bar: 2 } copy.bar的值来自obj.bar的getter函数的返回值

// 下面这个函数会拷贝所有自有属性的属性描述符
function completeAssign (target, ...sources) {
  sources.forEach(source => {
    let descriptors = Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key)
      return descriptors
    }, {})

    // Object.assign 默认也会拷贝可枚举的Symbols
    Object.getOwnPropertySymbols(source).forEach(sym => {
      let descriptor = Object.getOwnPropertyDescriptor(source, sym)
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor
      }
    })
    Object.defineProperties(target, descriptors)
  })
  return target
}

copy = completeAssign({}, obj)
console.log('拷贝访问器')
console.log(copy)
// { foo:1, get bar() { return 2 } }
