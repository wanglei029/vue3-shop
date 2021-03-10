let M = function (name) {
  this.name = name
}
let o3 = new M('o3')
console.log(o3 instanceof M)
// eslint-disable-next-line no-proto
console.log(o3.__proto__ === M.prototype)
console.log(o3 instanceof Object)

console.log(o3.__proto__ === Object.prototype)
console.log(o3)
