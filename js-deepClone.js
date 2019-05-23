function deepClone(obj) {
  let result;
  if(typeof obj == 'object') {
    if(Array.isArray(obj)) {
      result = [];
      for(let i = 0; i < obj.length;i++) {
        result[i] =  typeof obj[i] === "object" ? Object.prototype.toString.call(obj[i]) === '[object Null]' ? null : deepClone(obj[i]) : obj[i];
      }
    }else {
      result = {};
      for(let i in obj) {
        result[i] =  typeof obj[i] === "object" ? Object.prototype.toString.call(obj[i]) === '[object Null]' ? null : deepClone(obj[i]) : obj[i];
      }
    }
  }else {
    result = obj;
  }
  return result
}




// 以下是测试
let arr = [1, undefined,function(){},null, Symbol(),true,'aaa'];
let newArr = deepClone(arr);
console.log(arr);
console.log(newArr);
arr.push(4);
console.log(arr);
console.log(newArr);


let obj = {
  a: 1,
  b: '1',
  c: undefined,
  d: function(){},
  e: Symbol(),
  f: null,
  g: true,
}

let newObj = deepClone(obj);
console.log(obj);
console.log(newObj);
obj["a"] = 5;
console.log(obj);
console.log(newObj);


