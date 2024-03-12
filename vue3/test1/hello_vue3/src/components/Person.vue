<template>
    <!-- html结构 -->
    <div class="Person">
        <!-- {{}}插值语法，用于在html中插入vue实例中的数据 -->
        <h2>姓名：{{ name }}</h2>
        <h2>年龄：{{ age }}</h2>
        <!-- click绑定事件 -->
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="showTel">查看联系方式</button>
        <hr>
        <h2>测试：{{ name }}</h2>
        <h2>测试：{{ age }}</h2>
        <!-- <button @click="b">测试</button> -->
    </div>
</template>

<!-- <script lang="ts">
export default {
    name: 'Person'
}
</script > -->

<script lang="ts" setup name="Person234">
import { ref } from 'vue'
// 数据  此时的数据不是响应式的
let name = ref('张三')
let age = ref(18)
let tel = '13888888888'
console.log(name)
console.log(age)
console.log(tel)
//方法
function changeName() {
    name.value = 'zhang-san'  //注意：这样修改name，确实name被修改了，但name不是响应式的，因此页面没有任何变化
}
function changeAge() {
    age.value += 1  //注意：这样修改age，确实age被修改了，但age不是响应式的，因此页面没有任何变化
}
function showTel() {
    alert(tel)
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