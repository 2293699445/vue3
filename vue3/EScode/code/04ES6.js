
// const obj = {
//     // name: 'zce',
//     age: 18
// }

// const name = 'tom'
// const { name:objName='grace' } = obj
const { log } = console


// function foo(enable){
//     enable = enable === undefined? true:enable
//     log('foo invoked - enable:')
//     console.log(enable)
// }

// foo(false)

// function foo(){
//     log(arguments[0])
// }
// foo(1,2,3,4)

// this始终会指向调用这个函数的对象

//普通函数
// const person = {
//     name:'tom',
//     sayHi:function(){
//         log(`hi,my name is ${this.name}`)
//     }
// }

//箭头函数  箭头函数块中不会改变this的指向
// const person = {
//     name:'tom',
//     sayHi:()=>log(`hi,my name is ${this.name}`),
//     sayHiAsync:function(){
//         setTimeout(function(){
//             log(this.name)
//         },1000)
//     }
// }
// person.sayHi()


// const obj={
//     name:'zce',
//     age:18
// }

// log(Reflect.has(obj,'name'))
// log(Reflect.deleteProperty(obj,'age'))
// log(Reflect.ownKeys(obj))

// const s = new Set()

// s.add(1).add(2).add(3).add(4)

// // for(let i of s){
// //     log(i)
// // }

// const m = new Map()
// const tom = {name:'tom'}
// m.set(tom,90)
// console.log(m)
// console.log(m.get(tom))

// const obj ={
//     [Symbol()]:123
// }
// const s = Symbol()
// log(s)




// let life = ['吃饭', '吃饭', '吃饭',]
// let learn = ['语文', '语文', '语文']
// let work = ['喝茶']

// const all = [...life, ...learn, ...work]

// console.log(all)
// console.log(all[0])
// console.log(typeof (all))
// console.log(typeof (life))
// console.log(all[1])


// const arr = [
//     100,
//     200,
//     300,
// ]

// function sayHi(gouba){
//     log('hi')
//     log('#########',arguments)
// }

// const a = ()=>{
//     log('hi')
//     log('@@@@@@@@',arguments)
// }

// a('gouba')
// sayHi('gouba','shuhao')

// new a()

log(a)
var a =10


