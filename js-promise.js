/**
 * 手写promise
 * 
 */
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(excutor) {
  const self = this;
  self.status = PENDING;
  self.value = undefined;
  self.reason = undefined;

  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    if(self.status === PENDING) {
      self.status = RESOLVED;
      self.value = value;
      self.onFulfilledCallbacks.forEach(fn => {
        fn(self.value);
      });
    }
  }

  function reject(reason) {
    if(self.status === PENDING) {
      self.status = REJECTED;
      self.value = reason;
      self.onRejectedCallbacks.forEach(fn => {
        fn(self.reason);
      })
    }
  }

  excutor(resolve, reject)
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const self = this;
  let promise2 = new MyPromise((resolve, reject) => {
    if(self.status === PENDING) {
      self.onFulfilledCallbacks.push(() => {
        setTimeout(()=>{
          try {
            const x = onFulfilled();
            resolutionProcedure(promise2, x, resolve, reject)
          } catch(r) {
            reject(r);
          }
        })      
      })

      self.onRejectedCallbacks.push(() => {
        setTimeout(()=>{
          try {
            const x = onRejected();
            resolutionProcedure(promise2, x, resolve, reject)
          } catch(r) {
            reject(r);
          }
        }) 
      })
    }
  
    if(self.status === RESOLVED) {
      setTimeout(() => {
        try {
          const x = onFulfilled()
          resolutionProcedure(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    } 
  
    if(self.status === REJECTED) {
      setTimeout(() => {
        try {
          const x = onFulfilled()
          resolutionProcedure(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    }
  });

  return promise2;
}

function resolutionProcedure(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环引用!'))
  }

  let called = false;
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolutionProcedure(promise2, y, resolve, reject);
          },
          e => {
            if (called) return;
            called = true;
            reject(e);
          }
        )
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }

}

let p1 = () => {
  return new MyPromise((res, rej) => {
    if(Math.random() > 0.5) {
      res(333);
    }else {
      rej(555);
    }
  })
}

let p = new MyPromise((res, rej) => {
  // setTimeout(() => {
    if(Math.random() > 0.5) {
      res(11);
      // return p1()
    }else {
      rej(22);
      // return p1()
    }
  // }, 1000);
  
})

p.then(res => {
  console.log(res)
}, err => {
  console.log(err)
})