/**
 * 使用任务链表。每次都是创建任务，然后链入任务。
 */
class LazyMan {
  constructor(name){
    this.name = name
    this.tasks = []
    setTimeout(()=>this.next(),0)
  }
  next() {
    this.tasks.length && this.tasks.shift()()
  }
  eat(v){
    const task = ()=>{
      console.log(`${this.name} eat ${v}`)
      this.next()
    }
    this.tasks.push(task)
    return this
  }
  sleep(count){
    const task = ()=>{
      console.log(`等待${count}s`)
      setTimeout(()=>{
        this.next()
      },count * 1000)
    }
    this.tasks.push(task)
    return this
  }
}



// LazyMan示例

const me = new LazyMan('张三')
me.eat('苹果').eat('香蕉').sleep(5).eat('葡萄')

// 打印
// 张三 eat 苹果
// 张三 eat 香蕉
// 等待5秒
// 张三 eat 葡萄