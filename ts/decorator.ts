// 注意 一定要放最前 否则在装饰时，这个还未定义呢。
const validateDataArr: {index: number,number: number}[] = []

class Greeter {

  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @validate
  public greet(@moreThan(10) data: number) {
    return "Hello, " + this.greeting;
  }
}



function moreThan(nub: number) {
  return function (target: any, propertyKey: string, propertyIndex: number) {
    validateDataArr.push({ index: propertyIndex, number: nub })
  }
}

function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const fn = descriptor.value
  descriptor.value = function(...args: number[]){
    for(let obj of validateDataArr) {
      if(args[obj.index] <= obj.number) {
        console.log(`param ${obj.index} can not less then ${obj.number} `)
        return
      }
    }
    return fn.apply(this,args)
  }
}
// function moreThan(target: any, propertyKey: string, propertyIndex: number) {
//   validateDataArr.push()
// }

const g = new Greeter(';')

console.log(g.greet(11))
console.log(g.greet(9)) 