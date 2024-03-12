<template>
    <div class="person">
        <h2>{{ a }}Props的使用</h2>
        <h4>{{ c }}</h4>
        <ul>
            <li v-for="item in list" :key="item.id">姓名:{{ item.name }}， 年龄:{{ item.age }}，特长：{{ item.skill }}</li>
        </ul>
    </div>
</template>

<script lang="ts" setup name="Ts">

//导入
import { type PersonInter, type Persons } from '@/types'
import { reactive,withDefaults } from 'vue'

//数据
let person: PersonInter = { id: 'fawegweg01', name: '张三', age: 60 } //定义一个变量person，要符合PersonInter的规范

//接收参数
// defineProps(['a'])

//只接收一个参数并保存
// let param1 = defineProps(['a'])

//接收多个参数
// defineProps(['a', 'list','c'])

//接收参数+限制类型
// defineProps<{ list: Persons, a: string, c: string }>()

//接收参数+限制类型+限制必要性+指定默认值
withDefaults(defineProps<{ list?: Persons, a: string, c?: string }>(),{ list:()=>{
    [
    {name:'喜羊羊',age:10},
    {name:'美羊羊',age:8},
]
}})
//正常定义reactive定义的规范数组
// let personList: PersonInter[] = reactive([ //定义一个变量personList是数组类型
//     { id: 'asdgweg01', name: '张三', age: 60 },
//     { id: 'asdgweg02', name: '李四', age: 30 },
//     { id: 'asdgweg03', name: '王五', age: 20 },
// ])



//方法
</script>

<style scoped>
.person {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}

button {
    margin: 0 5px;
}
</style>

<!-- <template>
    <div class="people">
        <h1>中国</h1>
        <h2 ref="title2">北京</h2>
        <h3>尚硅谷</h3>
        <button @click="showLog">点我输出h2这个元素</button>
    </div>
</template>

<script lang="ts" setup name="Ref">
//导包
import { ref } from 'vue'
//数据
//title2用于存储ref标记的内容
let title2 = ref()
let a = ref(0)
let b = ref(1)
let c = ref(2)
//方法
function showLog() {
    console.log(title2.value)
    console.log(document.getElementById("title2"))
}
defineExpose({ a, b, c })
</script>

<style>
.people {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}

button {
    margin: 0 5px;
}
</style> -->

