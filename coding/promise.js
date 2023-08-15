/**
 * 手写promise奥义
 * 1. Promise类。promise中有status、value、reason、thenResolveFnList、thenRejectFnList、then、catch、finally等属性。
 * 2. Promise接受一个executor方法，并实现resolve,reject方法传进去。监控executor方法执行，抛错则reject。
 * 3. then方法执行时，判断状态，如果是结束状态，即执行then方法。如果是pending，就收入then方法列表中。等待resolve执行。
 * 4. resolve方法，要判断收到的值，如果是promise,就把resolve、reject传入then中。否则直接修改状态，并置value。reject同理，只是reject之后永远是reject。
 * 5. resolve有可能返回新的promise，因此then方法中，必须做判断。如果是promise，则递归遍历。（确保then的resolveFn，rejectFn收到的永远不是promise，promise在上一层就处理了）
 * 6. catch、fianlly使用then方法。
 * 
 * static
 * 1. resolve。 返回一个新的promise,判断输入，如果是promise，则传入resolve,reject。reject同理，只是传入reject。
 * 2. 
 */

const __FULLFILLED__ = 'fullfilled'
const __REJECTED__ = 'rejected'
const __PENDING__ = 'pending'

class MyPromise {
  status = __PENDING__
  value
  reason
  thenResolveFnList = []
  thenRejectFnList = []
  constructor(executor) {
    const resolve = (value) => {
      if (this.status === __PENDING__) {
        if (value instanceof MyPromise) {
          value.then(v => resolve(v), e => reject(e))
        } else {
          this.value = value
          this.status = __FULLFILLED__
          setTimeout(()=>{
            this.thenResolveFnList.forEach(f => f(this.value))
          })
        }
      }
    }
    const reject = (value) => {
      if (this.status === __PENDING__) {
        if (value instanceof MyPromise) {
          value.then(v => reject(v), e => reject(e))
        } else {
          this.reason = value
          this.status = __REJECTED__
          setTimeout(()=>{
            this.thenRejectFnList.forEach(f => f(this.reason))
          })
        }
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(resolveFn, rejectFn) {
    if (typeof resolveFn !== 'function') {
      resolveFn = res => res
    }
    if (typeof rejectFn !== 'function') {
      rejectFn = err => err
    }

    const promise2 = new MyPromise((resolve, reject) => {

      const execResolveFn = (value, resolveFn, rejectFn, resolve, reject) => {
        if (value instanceof MyPromise) {
          value.then(v => execResolveFn(v, resolveFn, rejectFn, resolve, reject), e => execRej(e, rejectFn, reject))
        } else {
          const res = resolveFn(value)
          resolve(res)
        }
      }
      const execRej = (value, rejectFn, reject) => {
        if (value instanceof MyPromise) {
          value.then(v => execRej(v, rejectFn, reject), v => execRej(v, rejectFn, reject))
        } else {
          const res = rejectFn(value)
          reject(res)
        }
      }
      if (this.status === __FULLFILLED__) {
        setTimeout(()=>execResolveFn(this.value, resolveFn, rejectFn, resolve, reject))
        
      }
      if (this.status === __REJECTED__) {
        setTimeout(()=>execRej(this.reason, rejectFn, reject))
      }
      if (this.status === __PENDING__) {
        this.thenResolveFnList.push(v => execResolveFn(v, resolveFn, rejectFn, resolve, reject))
        this.thenRejectFnList.push(e => execRej(e, rejectFn, reject))
      }
    })
    return promise2
  }
  catch(rejectFn) {
    // 注意，要是catch函数没有抛出错误，后续还是fulfilled
    return new MyPromise((resolve, reject) => {
      this.then(null, e => {
        try {
          const res = rejectFn(e)
          resolve(res)
        } catch (error) {
          reject(error)
        }
      })
    })
  }
  finally(fn) {
    return this.then((v) => { fn(); return v }, (v) => { fn(); return v })
  }
}

MyPromise.resolve = function (value) {
  return new MyPromise((resolve, reject) => {
    if (value instanceof MyPromise) {
      value.then(resolve, reject)
    } else {
      resolve(value)
    }
  })
}
MyPromise.reject = function (value) {
  return new MyPromise((resolve, reject) => {
    if (value instanceof MyPromise) {
      value.then(reject, reject)
    } else {
      reject(value)
    }
  })
}
MyPromise.all = function (promiseArr) {
  let length = promiseArr.length
  let resArr = []
  let count = 0
  return new MyPromise((resolve, reject) => {
    promiseArr.forEach((p, index) => {
      p.then(v => {
        resArr[index] = v
        count++
        if (count === length) {
          resolve(resArr)
        }
      }, reject)
    })
  })
}

MyPromise.allSettled = function (promiseArr) {
  let length = promiseArr.length
  let resArr = []
  let sucCount = 0
  let errCount = 0
  return new MyPromise((resolve, reject) => {
    promiseArr.forEach((p, index) => {
      p.then(v => {
        resArr[index] = { status: __FULLFILLED__, value: v }
        sucCount++
        if (sucCount + errCount === length) { // 只要一个成功就行
          resolve(resArr)
        }
      }, v => {
        resArr[index] = { status: __REJECTED__, reason: v }
        errCount++
        if (errCount === length) { // 需要全部失败才失败
          reject(resArr)
        }
        if (sucCount + errCount === length) { // 只要一个成功就行，注意失败这里也要判断成功
          resolve(resArr)
        }
      })
    })
  })
}

MyPromise.race = function (promiseArr) {
  return new MyPromise((resolve, reject) => {
    promiseArr.forEach((p, index) => {
      p.then(v => {
        resolve(v)
      }, reject)
    })
  })
}

MyPromise.any = function (promiseArr) {
  let count = 0;
  return new MyPromise((resolve, reject) => {
    promiseArr.forEach((p, index) => {
      p.then(v => {
        resolve(v)
      }, e => {
        count++;
        if (count === promiseArr.length) {
          reject(e)
        }
      })
    })
  })
}


// test

function runPromiseTest(Promise) {
  const log = (...args)=>console.log(Promise.name,...args)
  Promise.resolve('successs').then(v => {
    log('suc', v)
    return new Promise(resolve => {
      setTimeout(resolve('wait 1'), 1000)
    })
  }).then().then(r =>{ log(r);return 333}).finally(() => { log('finally'); throw 'final err';return 'finalData' }).then(r=>log('finalres',r)).catch(e => { log('catch', e) }).then(() => { }, err => {
    log('err', err);
  })


  const promise1 = Promise.reject(0);
  const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
  const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

  const promises = [promise1, promise2, promise3];

  log('allSettled')
  Promise.allSettled(promises).then((value) => log('allSettled',value));

  log('any')
  Promise.any(promises).then((value) => log('any',value));
}

runPromiseTest(MyPromise)

console.log('=======================')

runPromiseTest(Promise)
