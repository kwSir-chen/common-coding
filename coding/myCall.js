/**
 * call注意
 * 1. context默认指向window
 * 2. 传入非对象值会被对象化
 */

Function.prototype.myCall = function (context = window, ...args) {
  context = context instanceof Object ? context : new Object(context)
  let key = Symbol()
  context[key] = this
  const res = context[key](...args)
  Reflect.deleteProperty(context, key)
  return res
}

const window = global

window.a = 22;
console.log(window.a)
function f() {
  console.log(this.a)
}

f()
f.myCall({ a: 11 })
