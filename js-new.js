/**
 *  手写new
 *  1.新建一个对象
 *  2.改变这个对象的原型对象
 *  3.实现原构造函数 
 */

function New(func) {
  var res = {};
  if(func.prototype !== null) {
    res.__proto__ = func.prototype;
  }
  func.apply(res, Array.prototype.slice.call(arguments, 1))
  return res
}


// 检测
function Person(name) {
  this.name = name;
}

let p1 = new Person('jzq');
let p2 = New(Person, 'abc', 'ccc')
