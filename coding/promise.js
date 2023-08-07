/**
 * 研究promise的执行顺序，包括await
 * 1. then中return Promise。分为两种情况，新Promise后面不接then，需要过两个异步任务才回到下一个then。新Promise接then，走新promise的then，走完后，过一个微任务才返回then。
 * 2. then函数中返回await，不管await后面是什么，直接跳过两遍微任务，再返回执行。
 */

function test1() {

  Promise.resolve().then(() => {
    console.log(1)
    return new Promise(resolve => {
      console.log(111)
      resolve(2)
    })
  }).then((res) => {
    console.log(res)
  })

  Promise.resolve().then(() => console.log(11)).then(() => console.log(22)).then(() => console.log(33)).then(() => console.log(44))

}
// test1()


// 结果
/**
 * 1
 * 111
 * 11
 * 22
 * 33
 * 2
 * 44
 */

function test2() {
  Promise.resolve().then(() => {
    console.log(1)
    return new Promise(resolve => {
      console.log(111)
      resolve(2)
    }).then(res => {
      console.log(res)
      return 3
    })
  }).then((res) => {
    console.log(res)
  })

  Promise.resolve().then(() => console.log(11)).then(() => console.log(22)).then(() => console.log(33)).then(() => console.log(44))
}
// test2()


// 结果
/**
 * 1
 * 111
 * 11
 * 2
 * 22
 * 33
 * 3
 * 44
 */

// function test3() {

//   Promise.resolve().then(async () => {
//     console.log(1)
//     return await 2
//   }).then((res) => {
//     console.log(res)
//   })

//   Promise.resolve().then(() => console.log(11)).then(() => console.log(22)).then(() => console.log(33)).then(() => console.log(44))
// }

// test3()

// 结果
/**
 * 1
 * 11
 * 22
 * 33
 * 2
 * 44
 */

