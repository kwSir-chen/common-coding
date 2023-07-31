// 手写-实现一个对象的 flatten 方法（阿里）
/**
 * 
 const obj = {
    a: {
          b: 1,
          c: 2,
          d: {e: 5}
        },
    b: [1, 3, {a: 2, b: 3}],
    c: 3
  }

  flatten(obj) // 结果返回如下
  // {
  //  'a.b': 1,
  //  'a.c': 2,
  //  'a.d.e': 5,
  //  'b[0]': 1,
  //  'b[1]': 3,
  //  'b[2].a': 2,
  //  'b[2].b': 3
  //   c: 3
  // }
 */

function flatten(obj) {
  let res = {}
  for(let k in obj) {
    if(isObject(obj[k])) {
      let _obj = flatten(obj[k])
      for(let _k in _obj) {
        res[`${k}.${_k}`] = _obj[_k]
      }
      continue
    }
    if(isArray(obj[k])) {
      let _obj = flatten(obj[k])
      for(let _k in _obj) {
        res[`${k}[${_k}]`] = _obj[_k]
      }
      continue
    }
    res[k] = obj[k]
  }
  return res
}

function isObject(v) {
 return Object.prototype.toString.call(v) === '[object Object]'
}
function isArray(v) {
 return Object.prototype.toString.call(v) === '[object Array]'
}

const obj = {
  a: {
        b: 1,
        c: 2,
        d: {e: 5}
      },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
}

console.log(flatten(obj)) // 结果返回如下
