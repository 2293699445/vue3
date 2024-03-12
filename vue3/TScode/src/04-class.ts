class Person {
    public name:string  //修饰符public表示公开
    private age:number  //修饰符private表示私有，在类外面不能被访问
    protected readonly gender:boolean  //修饰符protected表示受保护的，只能在子类中访问;readonly只读属性表示该属性只能在定义或者在构造器中赋值，赋值方法只能二选其一。
    constructor(name:string,age:number){
        this.name=name
        this.age=age
        this.gender=true
    }
    sayHi(msg:string){
        console.log(`I am ${this.name},${msg}`)
        console.log(this.age)
    }
}

class Student extends Person{
    constructor(name:string,age:number){
        super(name,age)
        console.log(this.gender)
    }
    hardWroking():void{
        console.log(`${this.name}势必要用双手敲破家徒四壁`)
    }
}
let s1 = new Student('yuliang',22)
console.log(s1)
console.log(s1.sayHi('Hi'))
console.log(s1.hardWroking())

