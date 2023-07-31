function deepcopy(value) {
  if (typeof value !== 'object') { return value }
  if (Array.isArray(value)) {
    let res = []
    for (let v of value) {
      res.push(deepcopy(v))
    }
    return res
  }
  if (isObject(value)) {
    let res = {}
    for (let key in value) {
      res[key] = deepcopy(value[key])
    }
    return res
  }
}

function isObject(v) {
  return Object.prototype.toString.call(v) === "[object Object]"
}

// ex

let t1 = 123
let t2 = [1, 2, 3]
let t3 = { a: 1, b: [2, 3], d: 4 }

let r1 = deepcopy(t1)
let r2 = deepcopy(t2)
let r3 = deepcopy(t3)
console.log(r1)
console.log(r2)
console.log(r3)

t2[1] = 222
t3.d = 444
t3.b.push(4)

console.log('--------------------------------------')

console.log(r1)
console.log(r2)
console.log(r3)