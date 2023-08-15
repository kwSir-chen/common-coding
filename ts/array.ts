// // function arr_reduce<T>(total: T,current: number,):T;

// // function arr_reduce(total,current){
// //   return total
// // }

// const arr_reduce: {
//   (total: string, current: number,): number;
//   (total: string, current: number,): string;
//   <T>(total: T, current: number): T;
// } = <T>(total: string | T, current: number | T) => {
//   if (typeof total === 'string') {
//     return 23
//   }
//   return total
// }

// const a = arr_reduce<number>(12, 2)
// let p: Person = 1243

// function fff(x: string): string;
// function fff(x: number): boolean;
// function fff(x: string | number): string | boolean {
//   return "oops";
// }

// 提示sex age play

import { lib } from 'D:/kw/common-coding/ts/lib'

lib.say('2134')

const enum Status {
  a = '1',
  b = '2'
}

function f(v: Status) {

}

f(Status.a)