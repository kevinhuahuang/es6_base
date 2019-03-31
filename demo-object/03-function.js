function Person () {
  Person.prototype.insideFunction = 'inside'
}
Person.prototype.outsideFunction = 'outside'
let kevin = new Person()
let vivian = new Person()
console.log(kevin.insideFunction)
console.log(vivian.outsideFunction)
