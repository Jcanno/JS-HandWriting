Function.prototype.myapply = function(obj = global, arr) {
  obj._fn_ = this;
  // 判断是否有第二个参数
  if(arguments[1]) {
    // 判断第二个参数是否为数组
    if(Array.isArray(arguments[1])) {
      obj._fn_(...arr);
    }else {
      throw new TypeError("CreateListFromArrayLike called on non-object")
    }
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

o.fn.apply(b, "11");
o.fn.myapply(b, "11");