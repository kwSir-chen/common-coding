function myInstanceof(target,type) {
  if(typeof target !== 'object' || target === null) {
    return false
  }
  let proto = Object.getPrototypeOf(target)
  while(proto) {
    if(proto === type.prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

console.log('test', myInstanceof(null, Array)) // false
console.log('test', myInstanceof([], Array)) // true
console.log('test', myInstanceof('', Array)) // false
console.log('test', myInstanceof({}, Object)) // true