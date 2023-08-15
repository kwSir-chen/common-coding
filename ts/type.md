1. Pick
```
type Pick<T,K extends keyof T> = {
  [P in K]: T[P]
}
```
2. Omit
```
type Omit<T,K extends keyof T> = Pick<T,Exclude<keyof T,K>>
```
3. Required
```
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```
4. Partial
```
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```
5. Record
```
type Record<K extends keyof any,T> = {
  // K number | string | symbol
  [P in K]: T
}
```
6. Readonly
```
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```
7. NonNullable 
```
type NonNullable<T> = T & {}

```
8. Extract
```
type Extract<T,U> = T extends U ? T : never
```
9. Exclude
```
type Exclude<T,U> = T extends U ? never : T
```
10.  Parameters
```
type Parameters<T extends (...args: any)=>any> = T extends (...args: infer P)=>any ? P : never
```
11.  ReturnType
```
type ReturnType<T extends (...args: any)=>any> = T extends (...args: any)=>infer R ? R : never
```
12.  ConstructorParameter
```
type ConstructorParameter<T extends abstract new (...args: any)=>any> = T extends abstract new (...args: infer P)=>any ? P : never
```
13.   InstanceType
```
type ConstructorParameter<T extends abstract new (...args: any)=>any> = T extends abstract new (...args: any)=>infer R ? R : never
```
14.   Await<T>
```
// 使用 不作定义
```