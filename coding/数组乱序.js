function outOfOrderArray(array) {
  return [...array].sort(()=>Math.random() - 0.5)
}

function outOfOrderArray2(array) {
  let _arr = [...array]
  let res = []
  while(_arr.length) {
    let index = Math.floor(Math.random() * _arr.length)
    res.push(_arr.splice(index,1)[0])
  }
  return res
}

let arr = [1,2,3,4,5,6,7,8,9]
console.log(outOfOrderArray(arr))
console.log(outOfOrderArray2(arr))