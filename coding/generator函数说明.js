/**
 * generator函数
 * n个yield，就需要n+1个next
 * 第一个next输入值无效，第一个next返回值为第一个yield后面表达式值。第二个next输入参数代表第一个yield返回值（和其后面表达式无关，即使不输入，也是返回undefined）。
 * @returns 
 */

function *f() {
  let a = 1;
  let b = yield a + 1;
  let c = yield b + 1;
  return c
}

let it = f()
console.log(it.next(11))  // 2
console.log(it.next(22))  // 23
console.log(it.next(33))  // 33