var name = "why"
var age = 18
var obj = {
    //1
    name: name,
    age: age,
    //2
    foo: function () {
        return 'I love you'
    },
    bar() {
        return 'I love Bar'
    },
    baz:()=>{
        return 'I need you'
    }

}
obj[name+123] = 'heihei'
console.log(obj.name)
console.log(obj.foo())
console.log(obj.bar())
console.log(obj.baz())
console.log(obj)
