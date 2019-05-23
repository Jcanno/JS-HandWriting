/**
 *  手写JSON.stringfy
 *  1.核心为类型检测
 *  2.对象中的undefined、function、Symbol会被忽略,数组中会转化成null
 *  3.直接传undefined、function、Symbol会返回undefined
 *  
 */

// 直接传对象类型外的方法
function typeCheck(type, obj) {
  if(/string/.test(type)) {
    obj = '"' + obj + '"';
    return String(obj);
  }
  if(/boolean|number/.test(type)) {
    return String(obj);
  }
  if(/undefined|function|symbol/.test(type)) {
    return undefined;
  }
}

// 对对象中的值  赋值方法
function typeAssign(i) {
  let type = typeof i;
  if(/string/.test(type)) {
    i = '"' + i + '"';
  }else if(/undefined|function|symbol/.test(type)) {
    i = null;
  }else if(type === 'object') {
    i = jsonstringfy(i)
  }
  return i
}


function jsonstringfy(obj) {
  let type = typeof obj;
  if(type !== 'object') {
    return typeCheck(type, obj);
  }else {
    let json = [];
    if(Array.isArray(obj)) {
      for(let i of obj) {
        i = typeAssign(i);
        json.push(String(i));
      }
      return ("[") + String(json) + ("]") 
    }else {
      for(let k in obj) {
        let v = obj[k];
        v = typeAssign(v);
        if(v !== null) {
          json.push(('"' + k + '":') + String(v));
        }        
      }
      return ("{") + String(json) + ("}")
    }
  }
}



// 以下为测试
Array.prototype.a = 'a';
let a = [1, true, function(){}, Symbol(), 'aaa', undefined, {a:'a'}, ]

console.log(JSON.stringify(a));
console.log(typeof JSON.stringify(a));
console.log(jsonstringfy(a));
console.log(typeof jsonstringfy(a));

let o = {
  b: 'aaa',
  c: 123,
  d: true,
  e: Symbol(),
  f: function(){},
  g: undefined
}

console.log(JSON.stringify(o));
console.log(typeof JSON.stringify(o));
console.log(jsonstringfy(o));
console.log(typeof jsonstringfy(o));