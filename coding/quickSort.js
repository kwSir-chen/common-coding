/**
 * 快速排序 一定要把中间值分出来 不然重复的值就一直重复 造成死循环
 * @param {*} arr 
 * @returns 
 */
function quickSort(arr = []){
  if(arr.length <= 1) {return  arr}
  let center = arr[0]
  let leftArr = [],rightArr = [];
  for(let i = 1; i<arr.length;i++) {
    if(arr[i]<=center) {leftArr.push(arr[i])} else {rightArr.push(arr[i])}
  }
  return [...quickSort(leftArr),center,...quickSort(rightArr)]
}

console.log(quickSort([1,3,5,6,2,3]),
quickSort([1,1,1]),
quickSort([]),
quickSort([1,2,3]),
quickSort([3,2,1]))