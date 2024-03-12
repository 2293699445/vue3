"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.gender = true;
    }
    sayHi(msg) {
        console.log(`I am ${this.name},${msg}`);
    }
}

class Student extends Person {
    constructor(name, age) {
        super(name, age);
    }
    hardWroking() {
        console.log(`${this.name}势必要用双手敲破家徒四壁`);
    }
}
let s1 = new Student('yuliang', 22);
console.log(s1);
s1.sayHi('Hi');
s1.hardWroking();
//# sourceMappingURL=04-class.js.map