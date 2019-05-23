/**
 * 手写JSON.parse函数
 * 
 */
function jsonparse(str) {
  return (new Function('return' + str))();
}

// 测试
console.log(jsonparse('{ "age": 20, "name": "jack" }'));
