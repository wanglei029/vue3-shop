let lilei = {
  name: '李磊',
  age: 19,
  score: null,
  friends: ['jack', 'rose'],
  address: {
    prov: '北京',
    city: '北京',
    area: '海淀',
    street: '万寿路'
  }
}
const clone = function (obj) {
  if (obj === null) {
    /* 如果对象值为null 直接返回 */
    return null
  }
  if ({}.toString.call(obj) === '[object Array]') {
    /* 如果obj是数组 则创建新数组 并返回新的数组 */
    let newArr = []
    newArr = obj.slice()
    return newArr
  }
  /* 创建一个新的空对象 */
  let newObj = {}
  /* 遍历被克隆对象的属性 */
  for (let key in obj) {
    /* 如果原对象的当前属性 的类型是原始类型值不是object */
    if (typeof obj[key] !== 'object') {
      /* 每遍历一个属性 就向新obj中强行添加一个同名的属性 */
      /* 原始类型的复制 就是复制副本 */
      newObj[key] = obj[key]
    } else {
      /* 否则，当前属性不是原始类型值，
      再次调用clone函数，继续复制当前属性值 */
      newObj[key] = clone(obj[key])
    }
  }
  // newObj = obj
  return newObj
}
let lilei2 = clone(lilei)
console.log(lilei2)
console.log(lilei === lilei2)
// var lilei3 = Object.create(lilei)
// console.log('lilei3', lilei3, lilei3.name === lilei.name)
// console.log(lilei === lilei3)
// export default clone
