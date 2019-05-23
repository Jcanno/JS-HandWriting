Function.prototype.mycall = function(obj = global, ...args) {
  obj._fn_ = this;
  obj._fn_(...args);
  delete obj._fn_;
}




// 以下为测试
function fn(a, b) {
  console.log(a);
  console.log(b);
  console.log(this.name);
}

let o = {
  name: 'john',
  fn: fn
}

let b = {
  name: 'jack'
}

o.fn.call(b);
o.fn.mycall(b);