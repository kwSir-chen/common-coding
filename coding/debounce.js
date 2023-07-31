function debounce(fn,time = 300) {
  let timer;
  return function(...rest){
    if(timer) {clearTimeout(timer)}
    timer = setTimeout(fn.bind(this,rest),delay)
  }
}