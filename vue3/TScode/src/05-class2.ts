export {}
interface Eat{  //能力
    eat(food:string):void
}
interface Run{  //能力
    run(distance:number):void
}

class Person{  //祖先
    name:string
    age:number
    constructor(name:string,age:number){
        this.name=name
        this.age=age
    }
    eat(food:string):void{
        console.log(`优雅的进餐：${food}`)
    }
    run(distance:number):void{
        console.log(`直立行走:${distance}`)
    }
}

class Animal{  //祖先
    name:string
    age:number
    constructor(name:string,age:number){
        this.name=name
        this.age=age
    }
    eat(food:string):void{
        console.log(`呼噜噜的吃：${food}`)
    }
    run(distance:number):void{
        console.log(`爬行:${distance}`)
    }
 
}

class Student extends Person implements Eat,Run {  //祖先
    constructor(name:string,age:number){
        super(name,age)
    }
    
}

class Dog extends Animal implements Eat,Run{
    constructor(name:string,age:number){
       super(name,age)
    }
    
}

