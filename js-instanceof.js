/**
 * 手写instanceof函数
 * 
 */
function instanceOf(left, right) {
  let R = right.prototype;
  let L = left.__proto__;

  while(true) {

    if(L === null) {
      return false
    }

    if(L === R) {
      return true 
    }else{ 
      L = L.__proto__;
    }

  }
}