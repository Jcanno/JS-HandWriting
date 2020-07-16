const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(fn) {
	const self = this;
	self.status = PENDING;
	self.value = null;
	self.error = null;
	self.fulfillCallbacks = [];
	self.rejectCallbacks = [];
	
	// 改变状态，遍历所有reslove回调
	const resolve = value => {
		if(self.status !== PENDING) return;
		setTimeout(() => {
			self.status = FULFILLED;
			self.value = value;
			self.fulfillCallbacks.forEach(cb => cb(value));
		});
	}

	// 改变状态，遍历所有reject回调
	const reject = error => {
		if(self.status !== PENDING) return;
		setTimeout(() => {
			self.status = REJECTED;
			self.error = error;
			self.rejectCallbacks.forEach(cb => cb(error));
		});
	}

	fn(resolve, reject);
}


MyPromise.prototype.then = function(fulfilled, rejected) {
	// 检查传入的参数
	fulfilled = typeof fulfilled === 'function' ? fulfilled : (value) => value;
	rejected = typeof rejected === 'function' ? rejected : (error) => {throw error};

	let self = this;
	if(self.status === PENDING) {
		// 要返回一个promise
		return new MyPromise((resolve, reject) => {
			self.fulfillCallbacks.push(value => {
				try {
					const x = fulfilled(value);
					x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
				} catch (error) {
					reject(error)
				}
			})
			self.rejectCallbacks.push(error => {
				try {
					const x = rejected(error);
					x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
				} catch (error) {
					reject(error)
				}
			})
		})
	}

	if(self.status === FULFILLED) {
		return new MyPromise((resolve, reject) => {
			try {
				// 状态变为成功，会有相应的 self.value
				let x = fulfilled(self.value);
				// 拆解x
				x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
			} catch (e) {
				reject(e);
			}
		})
	}
	if(self.status === REJECTED) {
		return new MyPromise((resolve, reject) => {
			try {
				// 状态变为成功，会有相应的 self.error
				let x = rejected(self.error);
				x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
			} catch (e) {
				reject(e);
			}
		})
	}
}

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}

MyPromise.resolve = (param) => {
  if(param instanceof MyPromise) return param;
  return new MyPromise((resolve, reject) => {
    resolve(param);
  })
}

MyPromise.reject = function (error) {
	return new MyPromise((resolve, reject) => {
		reject(error);
	});
}

MyPromise.prototype.finally = function(callback) {
  return this.then(value => {
    return MyPromise.resolve(callback()).then(() => value);
  }, error => {
    return MyPromise.resolve(callback()).then(() => {throw error;})
  })
}

MyPromise.all = function(promiseArr) {
	let index = 0
  let result = []
  return new MyPromise((resolve, reject) => {
    promiseArr.forEach((p, i) => {
      //Promise.resolve(p)用于处理传入值不为Promise的情况
      MyPromise.resolve(p).then(
        val => {
          index++
          result[i] = val
          if(index === promiseArr.length) {
            resolve(result)
          }
        },
        err => {
          reject(err)
        }
      )
    })
  })
}

MyPromise.race = function(promiseArr) {
	return new MyPromise((resolve, reject) => {
		//同时执行Promise,如果有一个Promise的状态发生改变,就变更新MyPromise的状态
		for (let p of promiseArr) {
			MyPromise.resolve(p).then(  //Promise.resolve(p)用于处理传入值不为Promise的情况
				value => {
					resolve(value)        //注意这个resolve是上边new MyPromise的
				},
				err => {
					reject(err)
				}
			)
		}
	})
}
