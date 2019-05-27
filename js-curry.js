/**
 * 手写柯里化函数
 * 
 * 
 */

 // ES5 通用版
function curry(fn, args) {
  
  var length = fn.length;
  var args = args || [];

  return function() {
    
    var newArgs = args.concat(Array.prototype.slice.call(arguments));

    if(newArgs.length < length) {
      return curry.call(this, fn, newArgs);
    }else {
      return fn.apply(this, newArgs);
    }
  }
}

// ES6版本
function trueCurrying(fn, ...args) {

  if (args.length >= fn.length) {
      return fn(...args)
  }

  return function (...args2) {
      return trueCurrying(fn, ...args, ...args2)
  }
}
