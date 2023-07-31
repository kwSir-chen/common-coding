/**
 * bind
 * 1. 第一次bind后不可改变this，bind过程中的函数都会在最后执行时传入。也就是函数柯里化。
 * 2. new会改变bind的this。new优先级比bind更高
 */


Function.prototype.myBind = function(context = window,...args){
  const fn = this;
  function boundFn(...newArgs){
    // new执行时，this指向实例，即this instanceof boundFn，否则使用传进来的context
    context = this instanceof boundFn ? this: context;
    return fn.apply(context,args.concat(newArgs))
  }
  boundFn.prototype = Object.create(fn.prototype)

  return boundFn
}

// 测试用例

function Person(name, age) {
  console.log('Person name：', name);
  console.log('Person age：', age);
  console.log('Person this：', this); // 构造函数this指向实例对象
}

// 构造函数原型的方法
Person.prototype.say = function() {
  console.log('person say');
}

// 普通函数
function normalFun(name, age) {
  console.log('普通函数 name：', name); 
  console.log('普通函数 age：', age); 
  console.log('普通函数 this：', this);  // 普通函数this指向绑定bind的第一个参数 也就是例子中的obj
}


var obj = {
  name: 'poetries',
  age: 18
}

// 先测试作为构造函数调用
var bindFun = Person.myBind(obj, 'poetry1') // undefined
var a = new bindFun(10) // Person name: poetry1、Person age: 10、Person this: fBound {}
a.say() // person say

// 再测试作为普通函数调用
var bindNormalFun = normalFun.myBind(obj, 'poetry2') // undefined
bindNormalFun(12) 
// 普通函数name: poetry2 
// 普通函数 age: 12 
// 普通函数 this: {name: 'poetries', age: 18}