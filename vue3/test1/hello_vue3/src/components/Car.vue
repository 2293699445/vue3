<template>
    <div class="Car">
        <h1>{{ time }}</h1>
        <button @click=changeTime>修改时间</button>
        <h2>一辆{{ car.brand }}车，价值{{ car.price }}万</h2>
        <button @click="changePrice">修改汽车价格</button>
        <button @click="changeName">修改汽车名字</button>
        <button @click="changeCar">修改汽车</button>

    </div>
</template>

<script lang="ts" setup name="CarType">

import { reactive } from 'vue'
import { ref } from 'vue'



//数据
let time = ref('2024年2月22日')
let car = ref({
    brand: '奔驰',   //{}内为原对象，经过reactive包裹后就成响应式对象了
    price: 100
})
console.log(car)


//方法
function changePrice() {
    car.value.price += 10
}
function changeTime() {
    time.value = '2024年2月23日'
}
function changeName() {
    car.value.brand = '宝马'
}
function changeCar() {
    car.value = {brand:'保时捷', price:200}
}

</Script>

<style scoped>
/*样式 */
.Car {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}

button {
    margin: 0 5px;
}
</style>