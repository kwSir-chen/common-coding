/**
 * 1. JSON.parse JSON.stringify
 * 不能循环引用，不能有function，不能有日期，不能有正则，symbol，undefined会被忽略。
 */

/**
 * 2. structuredClone
 * 结构化克隆。原生支持的。但是也有限制。
 * dom不能支持，function不能支持。若用就会报错。
 */

/**
 * 3. 实现自定义的深拷贝函数
 *  1.1 通过传入第二个参数，weakMap来记录和返回当前新对象，从而实现循环引用。
 *  1.2 通过getType判断类型。基础类型直接返回。
 *  1.3 date对象和RegExp对象独立处理
 *  1.4 方法。方法执行内容，传参其实不会被改变，可以返回一个新方法，继承旧方法的原型链和this，然后返回即可。
 *  1.4 新建对象，有constructor通过构造器生成，可以继承原型。
 *  1.5 set和map对象遍历递归处理
 *  1.6 array和object使用Object.assign统一处理。
 */
function deepcopy(data,hash = new WeakMap()) {
  // 基本数据类型
  if(Object(data) !== data) {return data}
  // function基本不会改变，可以直接返回函数值，也可以略作处理。
  if(getType(data) === 'Function') {return handleFunc2(data)}
  if(getType(data) === 'Date') {return new Date(data)}
  if(getType(data) === 'RegExp') {return new RegExp(data.source,data.flags)}
  if(hash.has(data)) {return hash.get(data)}
  let result;
  if(data.constructor) {
    // 继承原型
    result = new data.constructor()
  } else {
    result = Object.create(null)
  }
  hash.set(data,result)
  if(data instanceof Map) {
    data.forEach((value,key)=>{
      result.set(key,deepcopy(value,hash))
    })
    return result
  }
  if(data instanceof Set) {
    data.forEach((value,key)=>{
      result.add(deepcopy(value),hash)
    })
    return result
  }
  
  // 数组 对象
  return Object.assign(result,...Object.keys(data).map((key)=>{
    return {[key]: deepcopy(data[key],hash)}
  }))
}

function getType(data) {
  let str = Object.prototype.toString.call(data)
  return Object.prototype.toString.call(data).replace(/\[object\s|\]/g,'')
}

/**
 * 直接返回函数
 * @param {*} func 
 * @returns 
 */
const handleFunc2 = function(func){
  let _f = function(...args){return func.apply(this,args)}
  _f.__proto_ = Object.create(func)
  return _f
}

/**
 * 函数切割处理。没多大必要
 * @param {*} func 
 * @returns 
 */
const handleFunc = (func) => {
  // 箭头函数直接返回自身
  if(!func.prototype) return func;
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s{0,}{)/;
  const funcString = func.toString();
  // 分别匹配 函数参数 和 函数体
  const param = paramReg.exec(funcString);
  const body = bodyReg.exec(funcString);
  if(!body) return null;
  if (param) {
    const paramArr = param[0].split(',');
    return new Function(...paramArr, body[0]);
  } else {
    return new Function(body[0]);
  }
}

// ex---------------------------------------------

let map = new Map()
map.set('a',1)

let set = new Set()
set.add(1)

let arr = [1]

function f(){console.log('f函数输出： '+this.arr)}
f.age = 1

let date = new Date('2023/11/22')

let a = {a: 1}
let b = {b: 1}

a.b = b
b.a = a

let t1 = {
  map,
  set,
  value: 't1',
  arr,
  f,
  date,
  symbol: Symbol(1),
  'uValue': undefined
}

let r1 = deepcopy(t1)
let r2 = deepcopy(a)
console.log('t1',t1)
console.log('t1.f.age',t1.f.age)
console.log('t1.f.res',t1.f())
console.log('r1',r1)
console.log('r2',r2)

// 修改
map.set('a',11)
set.add(22)
arr.push(22)
f.age = 11

console.log('--------------------------------------')
console.log('t1',t1)
console.log('t1.f.age',t1.f.age)
console.log('t1.f.res',t1.f())
console.log('r1',r1)
console.log('r1.f.age',r1.f.age)
console.log('r1.f.res',r1.f())