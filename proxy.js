// let person = {
//     name: '张三'
// }

// // 实例1：当读取不存在的属性时，抛出错误或其它信息而不是返回undefined
// let proxy = new Proxy(person, {
//     get: function(target, property) {
//         if (property in target) {
//             return target[property]
//         } else {
//             // throw new ReferenceError('Property \"' + property + "\" does not exist")
//             return '没有这个属性'
//         }
//     }
// })
//
// console.log(proxy.name)
// console.log(proxy.age)

//= =====================================================================================================================
// // 实例2：拦截读取继承属性
// let proto = new Proxy({}, {
//     get(target, propertyKey, receiver) {
//         console.log('GET' + propertyKey)
//         return target[propertyKey]
//     }
// })
//
// let obj = Object.create(proto)
// console.log(obj.name)
//= =====================================================================================================================
// // 实例3： 数组读取负数索引（负数索引表示倒着取数）
// function createArray(...elements) {
//     let handler = {
//         get(target, propKey, receiver) {
//             let index = Number(propKey)
//             if (index < 0) {
//                 propKey = String(target.length + index)
//             }
//             return Reflect.get(target, propKey, receiver)
//         }
//     }
//
//     let target = []
//     target.push(...elements)
//     return new Proxy(target, handler)
// }
//
// let arr = createArray('a', 'b', 'c')
// arr.push('d')
// arr.push('e')
// console.log(arr[-1])

//= =====================================================================================================================
// // 实例4：实例属性的链式操作（将属性的读取转换为执行一个函数） 需要html中运行
// let pipe = (function () {
//     return function (value) {
//         let funcStack = []
//         let oproxy = new Proxy({}, {
//             get: function (pipeObject, fnName) {
//                 if (fnName === 'get') {
//                     return funcStack.reduce(function (val, fn) {
//                         return fn(val)
//                     }, value)
//                 }
//                 funcStack.push(window[fnName])
//                 return oproxy
//             }
//         })
//         return oproxy
//     }
// }())
//
// let double = n => n * 2
// let pow = n => n * n
// let reverseInt = n => n.toString().split("").reverse().join("") | 0
//
// console.log(pipe(3).double.pow.reverseInt.get)

// ======================================================================================================================
// 实例5：实现一个生成各种DOM节点的通用函数dom 需要html文件中运行
// const dom = new Proxy({}, {
//     get(target, property) {
//         return function(attrs = {}, ...children) {
//             const el = document.createElement(property)
//             for (let prop of Object.keys(attrs)) {
//                 el.setAttribute(prop, attrs[prop])
//             }
//             for (let child of children) {
//                 if (typeof child === 'string') {
//                     child = document.createTextNode(child)
//                 }
//                 el.appendChild(child)
//             }
//             return el
//         }
//     }
// })
//
// const el = dom.div({},
//     'Hello, my name is',
//     dom.a({href:  '//example.com'}, 'Mark'),
//     '. I like:',
//     dom.ul({},
//         dom.li({}, 'The web'),
//         dom.li({}, 'Food'),
//         dom.li({}, '...actually that\'s it')))
//
// document.body.appendChild(el)

// ======================================================================================================================
// // 实例数据的限制
// let validator = {
//     set: function (obj, prop, value) {
//         if (prop === 'age') {
//             if (!Number.isInteger(value)) {
//                 throw new TypeError('The age is not an integer')
//             }
//             if (value > 200) {
//                 throw new RangeError('The age seems invalid')
//             }
//
//             //对于age以外的属性，直接保存
//             obj[prop] = value
//         }
//     }
// }
//
// let person = new Proxy({}, validator)
//
// person.age = 100
//
// console.log(person.age)
// person.age = 'young'
// person.age = 300

// ======================================================================================================================
// // 防止内部属性“_”被外部读写（通常我们以下划线开头，表示其内部属性）
// var handler = {
//     get (target, key) {
//         invariant(key, 'get')
//         return target[key]
//     },
//     set (target, key, value) {
//         invariant(key, 'set')
//         target[key] = value
//         return true
//     }
// }
//
// function invariant (key, action) {
//     if (key[0] === '_') {
//         throw new Error(`Invalid attempt to ${action} private "${key}" property`)
//     }
// }
//
// var target = {}
// var proxy = new Proxy(target, handler)
// proxy._prop
// proxy._prop = 'c'

// ======================================================================================================================
// 拦截---函数调用 call apply 操作
// 三个参数分别是
// 目标对象，目标对象的上下文对象(this)，目标对象的参数数组
var twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2
  }
}

function sum (left, right) {
  return left + right
}

let proxy = new Proxy(sum, twice)
console.log(proxy(1, 2)) // 6
console.log(proxy.call(null, 5, 6)) // 22
console.log(proxy.apply(null, [7, 8])) // 30

// =====================================================================================================================

// =====================================================================================================================

// =====================================================================================================================

// =====================================================================================================================

// =====================================================================================================================

// =====================================================================================================================
