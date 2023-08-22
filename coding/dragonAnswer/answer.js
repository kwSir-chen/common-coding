/**
 * 题目1：编写一个 People 类，使其的实例具有监听事件、触发事件、解除绑定功能。（实例可能监听多个不同的事件，也可以去除监听事件）
 */
class People {
  events = {}
  constructor(name) {
    this.name = name
  }

  // TODO: 请在此处完善代码
  on(eventName, fn) {
    if (!eventName) {
      throw new Error('事件名eventName需要是一个非空字符串')
    }
    if (typeof fn !== 'function') {
      throw new Error('监听事件函数需要是一个方法')
    }
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(fn)
  }
  emit(eventName, ...args) {
    if (!eventName) {
      throw new Error('事件名eventName需要是一个非空字符串')
    }
    if (this.events[eventName]) {
      // 执行emit时，this指向是People实例。同时让监听事件函数的this指向实例。
      this.events[eventName].forEach(fn => fn.apply(this, args))
    } else {
      console.warn(`没有监听事件${eventName}的方法可执行`)
    }
  }
  off(eventName,fn) {
    if (!eventName) {
      throw new Error('事件名eventName需要是一个非空字符串')
    }
    if (typeof fn !== 'function') {
      throw new Error('监听事件函数需要是一个方法')
    }
    const fnIndex = this.events[eventName].indexOf(fn)
    if(fnIndex !== -1) {
      this.events[eventName].splice(fnIndex,1)
    }
  }

  sayHi() {
    console.log(`Hi, I am ${this.name}`)
  }
}


/* 以下为测试代码 */
const say1 = (greeting) => {
  console.log(`${greeting}, nice meeting you.`)
}

const say2 = (greeting) => {
  console.log(`${greeting}, nice meeting you, too.`)
}

const jerry = new People('Jerry')
jerry.sayHi()
// => 输出：'Hi, I am Jerry'

jerry.on('greeting', say1)
jerry.on('greeting', say2)

jerry.emit('greeting', 'Hi')
// => 输出：'Hi, nice meeting you.' 和 'Hi, nice meeting you, too'

jerry.off('greeting', say1)
jerry.emit('greeting', 'Hi')
// => 只输出：'Hi, nice meeting you, too'

// =========================================================================================================================================================================

/**
 * 题目2：完成 sleep 函数，可以达到下面的效果：
 */
const sleep = (duration) => {
  // TODO
  return new Promise(resolve=>{
    setTimeout(resolve,duration || 0)
  })
}

const anyFunc = async () => {
  console.log("123") // 输出 123
  await sleep(300) // 暂停 300 毫秒
  console.log("456") // 输出 456，但是距离上面输出的 123 时间上相隔了 300 毫秒
}

anyFunc()

// =========================================================================================================================================================================

/**
 * 题目3：完成 deepGet 函数，给它传入一个对象和字符串，字符串表示对象深层属性的获取路径，可以深层次获取对象内容：
 */
const deepGet = (obj, prop) => {
  // TODO: 在此处完善代码
  
  // 解法1。通过构造新的方法。如果undefined.prop，会报错，捕获后返回undefined即可。
  const getPropValue = new Function('obj',prop ? `return obj.${prop}` : 'return obj')
  try {
    return getPropValue(obj)
  } catch (error) {
    return undefined
  }

  // 解法2。遍历props。
  // const pointSplitArr = prop.split('.')
  // let propArr = []
  // for(let str of pointSplitArr) {
  //   if(str.includes('[')) {
  //     // 处理students[0][1]这种取值
  //     let arr = str.split('[')
  //     // 首个属性直接加
  //     propArr.push(arr[0])
  //     // 遍历后面的属性加入，需去掉符号]
  //     for(let i = 1;i<arr.length;i++) {
  //       propArr.push(arr[i].replace(']',''))
  //     }
  //   } else {
  //     propArr.push(str)
  //   }
  // }
  // let res = obj;
  // for(let prop of propArr) {
  //   if(res[prop] !== undefined) {
  //     res = res[prop]
  //   } else {
  //     res = undefined
  //     break
  //   }
  // }
  // return res
}

/** 以下为测试代码 */
const deepGetRes1= deepGet({
  school: {
    student: { name: 'Tomy' },
  },
}, 'school.student.name') // => 'Tomy'

const deepGetRes2= deepGet({
  school: {
    students: [
      { name: 'Tomy' },
      { name: 'Lucy' },
    ],
  }
}, 'school.students[1].name') // => 'Lucy'

// 对于不存在的属性，返回 undefined
const deepGetRes3= deepGet({ user: { name: 'Tomy' } }, 'user.age') // => undefined
const deepGetRes4= deepGet({ user: { name: 'Tomy' } }, 'school.user.age') // => undefined

console.log(deepGetRes1)
console.log(deepGetRes2)
console.log(deepGetRes3)
console.log(deepGetRes4)

// =========================================================================================================================================================================

/**
 * 题目4：完成 combo 函数。它接受任意多个单参函数（只接受一个参数的函数）作为参数，并且返回一个函数。它的作为用：使得类似 f(g(h(a))) 这样的函数调用可以简写为 combo(f, g, h)(a)。
 */
const combo = (...fnArr) => {
  // TODO: 请在此处完善代码
  return function(param){
    return fnArr.reduceRight((lastRes,fn)=>{
      return fn(lastRes)
    },param)
  }
}

/* 以下为测试代码 */
const addOne = (a) => a + 1
const multiTwo = (a) => a * 2
const divThree = (a) => a / 3
const toString = (a) => a + ''
const split = (a) => a.split('')

console.log(split(toString(addOne(multiTwo(divThree(666))))))
// => ["4", "4", "5"]

const testForCombo = combo(split, toString, addOne, multiTwo, divThree)
console.log(testForCombo(666))
// => ["4", "4", "5"]


// =========================================================================================================================================================================

/**
 * 题目5：有两个盘子分别放有 5 个和 7 个小球，两个朋友玩游戏：每个人轮流从两个盘子中拿小球，每人每次只能从其中一个盘子中拿，每次可以拿 1 个或者多个（不能一个都不拿），拿到最后一个小球的人算输。问开局先手和后手是否有必胜策略？如果有，请描述必胜策略。

  答：
    1. 假设要朋友最后拿一个球。那么到我最后一轮时，有以下情况。
      a. 一个盘子有大于1的球数，另一个盘子无球。
      b. 两个盘子都有球。其中一个盘子只有一个球。
    2. 那么朋友拿的时候，什么样子才不得不形成以上两种情况呢。
      只有一种情况： 两个盘子都有球，都等于2。
    3. 那么，只要最先取球成了剩2，另一个就可以取球剩2，变成死局。
    4. 那么什么时候会必剩2呢，当然是只剩3的时候。
    5. 依此类推，只要取到剩下相同时，就必胜了。
    
    那么先手就是7个取2个必胜。既然有先手必胜，那么后手就无必胜策略。
 */