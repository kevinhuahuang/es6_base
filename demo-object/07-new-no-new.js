function person (namestr, nameEng, sex, profe) {
  this.name = namestr
  let englishName = 'unknown'
  this.englishName = nameEng // 无效，函数内部访问englishName时返回的是上面(和顺序无关)englishName:'unknown', 外部则没办法访问englishName
  this.sex = sex // 如果函数内部定义了 let sex = 'unknown'，此处则被 let sex覆盖，则此语句则无效,sex总是返回'unknown'
  let profession = profe
  return { this_name: name, person_name: englishName, person_sex: sex, person_profession: profession }
}
console.log(person.name) // person
let kevin = person('kevin', 'kevin', 'man', 'coder')
console.log(kevin) // { person_name: 'kevin' }
console.log(person.name) // person
console.log(kevin.name) // undefined
/**
 * 注意下面用new创建对象，用this.name的值并不是shirley而是和上面一样都是kevin, 但this.sex则是正确的woman
 * this.name 换成 let name则不会有这个问题，看来用不用new，this上是有区别的
 * */
let shirley1 = new person('shirley', 'shirley', 'woman', 'translator')
console.log(shirley1) // { person_name: 'kevin' } 与无new一样，据说里面this的指向不一样
console.log(person.name) // person
console.log(shirley1.name) // undefined

let shirley2 = new function (namestr, nameEng, sex, profe) {
  this.this_name = namestr
  this.person_name = nameEng
  this.person_sex = sex
  this.person_profession = profe
}('shirley', 'shirley', 'woman', 'translator')
console.log(shirley2)
console.log(shirley2.name) // undefined

let shirley = person('shirley', 'shirley', 'woman', 'translator')
console.log(shirley) // { person_name: 'kevin' } 与无new一样，据说里面this的指向不一样
console.log(shirley.name) // undefined

/** 闭包函数下
 * 1. 不应该用this来声明变量
 * 2. 不要使用new来创建对象，多余而且结果可能和想像的不一样
 * 3. 对象函数都有name函数，不要使用name作为变量名
 * */
