// let kevin = require('./kevin-exports')
// let shirley = require('./shirley-module.exports')
// let vivian = require('./vivian-mixture')

import * as kevin from './kevin.mjs'

console.log(kevin.getPersonalInformation()) //
console.log(kevin.name)
kevin.name = '华哥'
console.log(kevin.name)
kevin.nickname = '华记'
console.log(kevin.nickname)
console.log(kevin.getPersonalInformation()) // nickname在函数中是通过this引用的，会同步返回修改的值, 但name不会
kevin.setName('华仔')
kevin.setNickname('华华')
console.log(kevin.getPersonalInformation())
// console.log('--------------------------------------------')
// console.log(shirley.getPersonalInformation())
// console.log(shirley.name)
// shirley.name = '开心果'
// console.log(shirley.name)
// shirley.nickname = '开心果'
// console.log(shirley.nickname)
// console.log(shirley.getPersonalInformation()) // nickname在函数中是通过this引用的，会同步返回修改的值, 但name不会
//
// console.log('----------------------------------------------')
// console.log(vivian.name)
// vivian.name = '二蚊'
// console.log(vivian.name)
// console.log(vivian.getPersonalInformation()) // 修改后name的值并不会影响函数内name的值，原因？
// console.log(vivian.getVivianInformation())
