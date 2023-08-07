class Person {
  name: string
  private age: number
  protected count: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
    this.count = 250
  }
  say() {
    console.log(this.age, this.count)
  }
}

class Son extends Person {
  constructor(age: number) {
    super('son', age)
  }
  sonSay() {
    // @ts-ignore
    console.log(this.age,this.count)
  }
}

let person = new Person('dad',55)
person.say()
// @ts-ignore
console.log('%c [  ]-25', 'font-size:13px; background:pink; color:#bf2c9f;', person.age,person.count)

let son = new Son(11)
son.sonSay()
