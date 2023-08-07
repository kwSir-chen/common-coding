const origin = { count: 123 }

const refOrigin = new Proxy(origin, {
  get(target, key, receiver) {
    if (key === '__v_isRef') { return true }
    console.log('%c [  ]-6', 'font-size:13px; background:pink; color:#bf2c9f;', 'get origin key: ' + key)
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    console.log('%c [  ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', `set origin.${key} = ${value}`)
    return Reflect.set(target, key, value, receiver)
  }
})


/**
 * 模拟toRef。
 * 原理就是实例化一个proxy空对像，getValue返回target[key]，setValue设置targetKey，触发target的proxy事件。
 * @param {*} target 
 * @param {*} key 
 * @returns 
 */
class ObjectRefImpl {
  constructor(target,key) {this.target = target;this.key = key}
  get __v_isRef() {
    return true
  }
  get value() {
    return this.target[this.key]
  }
  set value(value) {
    return this.target[this.key] = value
  }
}

function isRef(target = {}) {
  // vue自有其判断，这里只是模拟。js暂时没有区分proxy对象和普通对象的能力，使用toString和instanceof都会报错，即使能证明是proxy对象，也不一定是ref对象。vue应是在reactive过程中有做标记。
  return !!target.__v_isRef
}

function toRef(target, key) {
  return isRef(target[key]) ? target[key] : new ObjectRefImpl(target, key)
}

let count = toRef(refOrigin,'count')

console.log('count: ',count.value)

console.log('=====================')
console.log('count add 21',count.value +=  21)

console.log('count: ',count.value)
console.log('refOrigin count: ',refOrigin)

console.log('=====================')
console.log('refOrigin count dec 44',refOrigin.count -= 44)

console.log('count: ',count.value)
console.log('refOrigin count: ',refOrigin)


