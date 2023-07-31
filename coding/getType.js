function getType(data) {
  const str = Object.prototype.toString.call(data)
  const spaceIndex = str.indexOf(' ')
  return str.slice(spaceIndex+1,-1).toLowerCase()
}

// 功能测试
console.info( getType(null) ) // null
console.info( getType(undefined) ) // undefined
console.info( getType(100) ) // number
console.info( getType('abc') ) // string
console.info( getType(true) ) // boolean
console.info( getType(Symbol()) ) // symbol
console.info( getType({}) ) // object
console.info( getType([]) ) // array
console.info( getType(() => {}) ) // function
console.info( getType(new Date()) ) // date
console.info( getType(new RegExp('')) ) // regexp
console.info( getType(new Map()) ) // map
console.info( getType(new Set()) ) // set
console.info( getType(new WeakMap()) ) // weakmap
console.info( getType(new WeakSet()) ) // weakset
console.info( getType(new Error()) ) // error
console.info( getType(new Promise(() => {})) ) // promise