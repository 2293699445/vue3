<template>
    <div class="Person">
        <h2>姓名：{{ person.name }}</h2>
        <h2>年龄：{{ person.age }},{{ nl }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
        <h2>狗名：{{ Dog.value }}</h2>
        <button @click="changeDogName">修改狗名</button>
    </div>
</template>

<script lang="ts" setup name="Person">
import { reactive, ref, toRefs, toRef } from 'vue'

//数据
let person = reactive({
    name: '张三',
    age: 19
})
// let {name,age} = person   //相当于重新定义了两个变量与person对象中的没有关系 let name = person.name;  let age = person.age
//name,age为非响应式的数据
let { name, age } = toRefs(person)
let nl = toRef(person, 'age')
console.log(nl.value)

let Dog = ref({
    value: 'zhangsan'
})



//函数
function changeName() {
    name.value += '~'
}
function changeAge() {
    age.value += 1
}
function changeDogName() {
    Dog.value.value = '小于'
}

</script>

<style scoped>
/*样式 */
.Person {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}

button {
    margin: 0 5px;
}
</style>