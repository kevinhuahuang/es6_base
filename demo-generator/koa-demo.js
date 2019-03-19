// // koa中如何应用Generator
// let info = ''
// function* g1() {
//     info += '1' // 拼接 1
//     yield* g2() // 拼接 234
//     info += '5' // 拼接 5
// }
//
// function* g2() {
//     info += '2' // 拼接 2
//     yield* g3() // 拼接 3
//     info += '4' // 拼接 4
// }
//
// function* g3() {
//     info += '3' // 拼接3
// }
//
// let g = g1()
// g.next()
// console.log(info)
