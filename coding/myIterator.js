/**
 * Symbol.iterator有以下要点。
 * 1. iterator是小写。
 * 2. iterator只执行一次，后面遍历执行的都是next方法。
 * 3. iterator必须返回一个对象，对象里面有next方法。
 * 4. next方法必须返回iterator函数格式。即{value: any,done: boolean}
 */



function myIterator() {
  let index = 0;
  let obj = this;
  let keyArr = Object.keys(obj)

  return {next() {
    if (index < keyArr.length) {
      return {
        value: obj[keyArr[index++]],
        done: false
      }
    } else {
      return {
        value: undefined,
        done: true
      }
    }

  }}
}

const obj1 = {
  a: 'a',
  2: 'b',
  c: 'dd',
  [Symbol.iterator](){
    return myIterator.call(this)
  } 
}

Object.defineProperty(obj1,Symbol.iterator,{
  enumerable: false
})

for(let v of obj1) {
  console.log(v)
}

// 回忆写