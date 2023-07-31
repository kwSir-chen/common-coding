function throttle(fn,delay = 300){
  let flag = false;
  return function(...rest){
    if(!flag) {
      fn.apply(this,rest)
      flag = true;
      setTimeout(()=>{flag = false},delay)
    }
  }
}
