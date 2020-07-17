// async、await是关键字，我们可以模拟实现async、await的功能
// async、await实际是对generator的封装，返回promise
// 传入generator迭代器
function run(gen) {
  //把返回值包装成promise
  return new Promise((resolve, reject) => {
    var g = gen()

    function step(val) {
      //错误处理
      try {
        var res = g.next(val)
      } catch(err) {
        return reject(err);
      }
      if(res.done) {
        return resolve(res.value);
      }
      // 兼容传入的值不是promise
      Promise.resolve(res.value).then(
        val => {
          step(val);
        },
        err => {
          //抛出错误
          g.throw(err)
        });
    }
    step();
  });
}
