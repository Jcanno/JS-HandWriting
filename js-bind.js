/**
 * 手写bind函数
 * 通过闭包返回一个函数
 * 
 */
Function.prototype.mybind = function(obj = global ) {
  let self = this;
  let args = [...arguments];

  return function() {
    obj._fn_ = self;
    if(args.length > 1) {
      obj._fn_(...args.slice(1));
    }else {
      obj._fn_();
    }
    
    delete obj._fn_; 
  }
}


// 以下为测试
function fn() {
  console.log(Array.prototype.slice.call(arguments, 0))
  console.log(arguments)
  console.log(this.name);
}

let o = {
  name: 'john',
  fn: fn
}

let b = {
  name: 'jack'
}

var c = o.fn.bind();
c()
var d = o.fn.mybind();
d()