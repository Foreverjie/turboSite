// var request = require("request");

const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

const MyPromise = function (fn) {
  this.status = PENDING
  this.value = null
  this.reason = null

  this.onFullfilledCallback = []
  this.onRejectedCallback = []

  const that = this

  function resolve(value) {
    if (that.status === PENDING) {
      that.value = value
      that.status = FULLFILLED
      that.onFullfilledCallback.forEach(f => {
        f(this.value)
      })
    }
  }

  function reject(reason) {
    if (that.status === PENDING) {
      that.reason = reason
      that.status = REJECTED
      that.onRejectedCallback.forEach(f => {
        f(this.reason)
      })
    }
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function (onFullfilled, onRejected) {
  let _onFullfilled = onFullfilled
  if (typeof _onFullfilled !== 'function') {
    _onFullfilled = function (value) {
      return value
    }
  }

  let _onRejected = onRejected
  if (typeof _onRejected !== 'function') {
    _onRejected = function (reason) {
      if (reason instanceof Error) {
        throw reason
      } else {
        throw new Error(reason)
      }
    }
  }

  if (this.status === FULLFILLED) {
    let newPromise = new MyPromise((resolve, reject) => {
      try {
        _onFullfilled(this.value)
        resolve(this.value)
      } catch (e) {
        reject(e)
      }
    })

    return newPromise
  }
  if (this.status === REJECTED) {
    let newPromise = new MyPromise((resolve, reject) => {
      try {
        _onRejected(this.reason)
        resolve()
      } catch (e) {
        reject(e)
      }
    })

    return newPromise
  }
  if (this.status === PENDING) {
    let newPromise = new MyPromise((resolve, reject) => {
      this.onFullfilledCallback.push(() => {
        try {
          _onFullfilled(this.value)
        } catch (e) {
          reject(e)
        }
      })
      this.onRejectedCallback.push(() => {
        try {
          _onRejected(this.reason)
        } catch (e) {
          reject(e)
        }
      })
    })

    return newPromise
  }
}

const p11 = new Promise((resolve, reject) => {
  // request('https://baidu.com')
  resolve(200)
})
  .then(
    value => {
      console.log('[promise] http status', value)
      return value
    },
    e => {
      console.log('[promise] http error', e)
    },
  )
  .then(value => {
    console.log('[promise] p1 then value', value)
  })

const p1 = new MyPromise((resolve, reject) => {
  // request('https://baidu.com')
  resolve(200)
})
  .then(
    value => {
      console.log('[mypromise] http status', value)
      return value
    },
    e => {
      console.log('[mypromise] http error', e)
    },
  )
  .then(value => {
    console.log('[mypromise] p1 then value', value)
  })

const p22 = new Promise((resolve, reject) => {
  // request('https://baidu.com')
  reject(200)
})
  .then(
    value => {
      console.log('[promise] http status', value)
    },
    e => {
      console.log('[promise] http error', e)
      throw e
    },
  )
  .then(
    () => {},
    e => {
      console.log('[promise] error then error', e)
    },
  )

const p2 = new MyPromise((resolve, reject) => {
  // request('https://baidu.com')
  reject(200)
})
  .then(
    value => {
      console.log('[mypromise] http status', value)
    },
    e => {
      console.log('[mypromise] http error', e)
      throw e
    },
  )
  .then(
    () => {},
    e => {
      console.log('[mypromise] error then error', e)
    },
  )

// JavaScript 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个。完善代码中 Scheduler类，使得以下程序能正确输出。

// 需要注意的点：
// add 函数后面有个.then 所以add函数是一个Promise对象

class Scheduler {
  constructor() {
    this.task = []
    this.runningTask = []
  }

  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      promiseCreator.resolve = resolve
      if (this.runningTask.length < 2) {
        this.run(promiseCreator)
      } else {
        this.task.push(promiseCreator)
      }
    })
  }

  run(promiseCreator) {
    this.runningTask.push(promiseCreator)
    promiseCreator().then(() => {
      promiseCreator.resolve()
      let index = this.runningTask.findIndex(promiseCreator)
      this.runningTask.splice(index, 1)
      if (this.task.length > 0) {
        this.run(this.task.shift())
      }
    })
  }
}

class NewScheduler {
  constructor(n) {
    this.taskQueue = []
    this.max = n
    setTimeout(() => this.run(), 0)
  }

  add(task) {
    // this.taskQueue.push(task)
    return new Promise(resolve => {
      const wrapFunc = () => task().then(resolve)
      this, this.taskQueue.push(wrapFunc)
    })
  }

  run() {
    const remainTaskLen = Math.min(this.max, this.taskQueue.length)
    for (let i = 0; i < remainTaskLen; i++) {
      this.max--
      const task = this.taskQueue.shift()
      task().then(() => {
        this.max++
        this.run()
      })
    }
  }
}

const timeout = time =>
  new Promise(resolve => {
    setTimeout(resolve, time)
  })

const scheduler = new Scheduler()
const newS = new NewScheduler(2)
const addTask = (time, index) => {
  // scheduler.add(() => timeout(time)).then(() => console.log(index))

  newS.add(() => timeout(time)).then(() => console.log(index))
}

addTask(400, 4)
addTask(200, 2)
addTask(100, 1)
addTask(300, 3)

const curry = (fn, ...args) => {
  return args.length >= fn.length
    ? fn(...args)
    : (..._args) => curry(fn, ...args, ..._args)
}

console.log('aaaa')

function add(x, y, z) {
  return x + y + z
}

var curriedAdd = curry(add)

console.log('curried add', curriedAdd(1)(2)(3))
console.log('add', add(1, 2, 3))

// 实现一个sum

const sum = (...args) => {
  const fn = (..._args) => sum(...args, ..._args)
  fn.count = () => args.reduce((a, b) => a + b, 0)
  return fn
}

console.log(sum(1)(2)(3).count()) // 6
console.log(sum(1)(2, 4)(3).count()) // 10

// promise.all 如果数组里不是promise对象呢？

// RN 和其他跨端项目的优劣势

// 设计一个通用的SDK，用来数据埋点和上报，应该提供什么能力？哪些API？
// 失败的请求 怎么保证上传成功？
// 积压失败的请求怎么处理？

// React native 怎么实现热更新的？基建怎么做？

// 为啥从腾讯到现在这家公司？

// graphql 底层怎么实现的？优势是什么？

// 性能优化做过什么事情？
