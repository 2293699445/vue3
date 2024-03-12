
var names = ["喜羊羊","美羊羊","懒羊羊"]

//对数组解构：[]
var [item1,item2,item3]=names
console.log(item1)  //喜羊羊
console.log(item2) //美羊羊
console.log(item3) //懒羊羊
console.log('--------------------------------')
//解构第一个元素后面的元素: ,
var [,n2,n3]=names
console.log(n2) //美羊羊
console.log(n3) //懒羊羊
console.log('--------------------------------')
//解构出一个元素，后面的元素放到一个新数组中：...
var [item1,...newArry] = names
console.log(item1)    //喜羊羊
console.log(newArry)  //[ '美羊羊', '懒羊羊' ]
console.log('--------------------------------')
//解构的默认值: =
var [item1,itme2,item3,item4='不知道什么羊']=names
console.log(item1) //喜羊羊
console.log(itme2) //美羊羊
console.log(item3) //懒羊羊
console.log(item4) //不知道什么羊(不给item4默认值，则会打印undefine)

var obj = {
    name:"why",
    age:18,
    height:1.88
}
//对象解构：{}
var {name,age,height} =  obj
console.log(name,age,height)   //why 18 1.88

//解构单个属性
var {age} =obj
console.log(age)  //18

//解构一个属性并给其取别名：：
var {name:newName}=obj
console.log(newName)  //why

//解构一个不存在的属性，取别名并赋默认值： =
var {address: newAddress = "广州市"} = obj
console.log(newAddress)  //广州市