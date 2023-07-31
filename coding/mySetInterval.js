window = globalThis

function mySetInterval(fn,time) {
  if(!window.clearMyInterval)  {
    // 模拟清除。实际timer是数字，这里用函数模拟。
    window.clearMyInterval = fn=>fn()
  }
  // 不是方法，不管。
  if(typeof fn !== 'function') {return ()=>{}}
  let timer;
  let isClear = false;
  function interval(){
    if(isClear) {clearTimeout(timer);return}
    timer = setTimeout(()=>{fn();interval()},time)
  }
  interval()
  return ()=>{isClear = true}
}

const timer1 = mySetInterval(()=>console.log(11),1000)
const timer2 = mySetInterval(()=>console.log(22),2000)
const timer3 = mySetInterval(console.log(33),3000)

setTimeout(()=>clearMyInterval(timer1),5000)
setTimeout(()=>clearMyInterval(timer2),10000)
setTimeout(()=>clearMyInterval(timer3),10000)