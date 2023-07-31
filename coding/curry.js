/***
 * 函数柯里化
 * 1. 首先记录函数的输入参数数量，通过f.length。
 * 2. 返回一个函数，函数内判断，当前输入函数的参数是否够了，不够继续返回函数，否则返回函数执行结果。
 */

function curry(f) {
  const inputLength = f.length
  if(!inputLength) {return f()}
  const inputParams = []
  let res;
  function _f(...args) {
    if(args.length + inputParams.length >= inputLength) {
      return f.apply(this,inputParams.concat(args))
    } else {
      inputParams.push(...args)
      return _f
    }
  }
  return _f
}

// 测试

function add(a, b, c) {
  return a + b + c
}
// add(10, 20, 30) // 60

var curryAdd = curry(add)
var res = curryAdd(10)(20)(30) // 60
console.info(res)