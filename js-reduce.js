Array.prototype.reduce  = function(callbackfn, initialValue) {
  // 处理异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'reduce' of null or undefined");
  }
  if (Object.prototype.toString.call(callbackfn) != "[object Function]") {
    throw new TypeError(callbackfn + ' is not a function')
  }
  let O = Object(this);
  let len = O.length >>> 0;
  let k = 0;
	let accumulator = initialValue;
	
  if (accumulator === undefined) {
    for(; k < len ; k++) {
      if (k in O) {
        accumulator = O[k];
        k++;
        break;
      }
    }
  }
  // 表示数组全为空
  if(k === len && accumulator === undefined) 
    throw new Error('Each element of the array is empty');
  for(;k < len; k++) {
    if (k in O) {
      accumulator = callbackfn.call(undefined, accumulator, O[k], k, O);
    }
  }
  return accumulator;
}