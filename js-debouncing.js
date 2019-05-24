/**
 * 手写防抖函数
 * 特点：只记录最后一次的触发事件
 */
function debounce(fn, wait, immediate) {
  let timer;
  return function() {
    if(immediate) {     
      fn.apply(this, arguments);
    }
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  }
}