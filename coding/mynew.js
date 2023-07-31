/***
 * new
 * 1. 继承构造函数prototype。可通过Object.create。(Object.create同时也创建了一个新的对象，可作为实例)
 * 2. 执行构造函数，将构造函数this转化为实例。可通过apply。
 * 3. 判断构造函数执行后是否返回值，返回值是否不为空且是对象类型，如果是就返回返回值，否则返回对象。
 */


function mynew(fn,...args) {
  let obj = Object.create(fn.prototype)
  let res = fn.apply(obj,args)
  if(res && res instanceof Object) {
    return res
  }
  return obj
}

function Dog(v){this.a = v;return {b:22}}
function Cat(v){this.a = v;return null}

console.log(mynew(Dog,'dog'))
console.log(mynew(Cat,'cat'))