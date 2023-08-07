// function arr_reduce<T>(total: T,current: number,):T;

// function arr_reduce(total,current){
//   return total
// }

const arr_reduce: {
  (total: string,current: number,):number;
  (total: string,current: number,):string;
  <T>(total: T,current: number):T;
}  = <T>(total:string | T,current:number|T)=>{
  if(typeof total === 'string') {
    return 23
  }
  return total
}

const a =arr_reduce<number>(12,2)