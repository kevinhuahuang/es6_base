function myPromise() {
    let p = new Promise(function (resolve, reject) {
        let num = Math.random() * 10
        setInterval(function () { // 并不会重复执行，只执行一次
            if (num < 5) {
                resolve('数据:' + num + ' 小于5 正确')
            } else  {
                reject('数据：' + num + ' 大于5 错误')
            }
        }, 1000)
    })
    return p
}

myPromise()
    .then(function (data) {
        console.log('操作成功')
        console.log(data)
    })
    .catch(function (data) {
        console.log('操作失败')
        console.log(data)
    })

//======================================================================================================================
// function runAsync(message) {
//     let p = new Promise (function (resolve, reject) {
//         setTimeout(function () {
//             console.log('执行完成')
//             resolve(message)
//         }, 2000)
//     })
//     return p
// }


// runAsync('第一个promise').then(function (data) {
//     console.log(data)
//     return runAsync('第二个Promise')
// })
// .then(function (data) {
//     console.log(data)
//     return runAsync('第三个Promise')
// })
// .then(function (data) {
//     console.log(data)
//     return '直接返回数据，而不是Promise对象，不需要执行Promises函数，直接调用后面的then，并返回数据'
// })
// .then(function (data) {
//     console.log(data)
// })


//======================================================================================================================
// function firstPromise (message) {
//     let p = new Promise( function (resolve, reject) {
//         setTimeout( function () {
//             console.log('第一个Promise执行完成，耗时1秒')
//             resolve(message)
//         }, 1000)
//     })
//     return p
// }
//
// function secondPromise (message) {
//     let p = new Promise( function (resolve, reject) {
//         setTimeout( function () {
//             console.log('第二个Promise执行完成，耗时2秒')
//             resolve(message)
//         }, 2000)
//     })
//     return p
// }
//
// function thirdPromise (message) {
//     let p = new Promise( function (resolve, reject) {
//         setTimeout( function () {
//             console.log('第三个Promise执行完成，耗时3秒')
//             resolve(message)
//         }, 3000)
//     })
//     return p
// }
//
// function fourthPromise (message) {
//     let p = new Promise( function (resolve, reject) {
//         setTimeout( function () {
//             console.log('第四个Promise执行完成，耗时4秒')
//             resolve(message)
//         }, 4000)
//     })
//     return p
// }
//
//
// // // all参数中的Promise对象并行执行（同时执行），全部执行完再执行then。
// // // all把所有promise对象返回的数据组成数组作为then的参数
// // // 以最慢的Promise执行完为then调用的时间点
// // Promise.all([firstPromise('第一个Promise'),secondPromise('第二个Promise'),thirdPromise('第三个Promise'),fourthPromise('第四个Promise')])
// //     .then(function (result) {
// //         console.log(result)
// //     })
//
// //以最快完成的Promise为then调用的时间点，其它Promise会继续执行
// Promise.race([firstPromise('第一个Promise'), secondPromise('第二个Promise'), thirdPromise('第三个Promise'),fourthPromise('第四个Promise')])
//     .then(function (result) {
//         console.log(result)
//     })
// /* 输出结果为
// *第一个Promise执行完成，耗时1秒
// *第一个Promise
// *第二个Promise执行完成，耗时2秒
// *第三个Promise执行完成，耗时3秒
// *第四个Promise执行完成，耗时4秒
// */