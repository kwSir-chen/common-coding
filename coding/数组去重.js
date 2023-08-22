function removeDuplicates(arr){
  const map = new Map()
  const res = []
  for(let v of arr) {
    if(!map.get(v)) {
      map.set(v,true)
      res.push(v)
    }
  }
  return res
}

console.log(removeDuplicates([1,2,3,3,2,1,1]))