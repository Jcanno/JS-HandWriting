/**
 * 手写call函数
 * 
 */
Function.prototype.mycall = function(obj = global) {
  obj._fn_ = this;
  let args = [...arguments].slice(1);
  obj._fn_(...args);
  delete obj._fn_;
}