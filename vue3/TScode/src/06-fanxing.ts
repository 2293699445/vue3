
// import {camelCase} from 'lodash'


// // declare function camelCase(input:string):string
// const res = camelCase('hello type')

function createArray<T>(length:number,value:T):T[]{
    const arr = Array<T>(length).fill(value)
    return arr
}
const res = createArray<string>(3,'tutou')
const res2 = createArray<number>(3,996)