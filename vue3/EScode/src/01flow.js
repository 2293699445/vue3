//@flow

// function sum(a:number,b:number){
//     return a+b
// }

// sum(0,19)
// sum('100','ytdy')

// function power(): number {
//     return 'sgwe'
// }



// let n:number = 10
// n='sfa'

// const obj2:{foo?:string,bar:number} = {foo:'s',bar:100}


function passMixed (value:mixed){
    if(typeof value === 'string'){
        return value.substr(1)
    }
    if(typeof value ==='number'){
        return value*value
    }
}

passMixed(100)
passMixed('agw')

let mstr = 'gouba'

