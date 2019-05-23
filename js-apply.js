Function.prototype.myapply = function(obj = global, arr) {
  obj._fn_ = this;
  // 判断是否有第二个参数
  if(arguments[1]) {
    obj._fn_(...arr);
  }else {
    obj._fn_();
  }
  
  delete obj._fn_;
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

o.fn.apply();
o.fn.myapply();