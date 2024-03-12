<template>
    <div class="Person">
        姓：<input type="text" v-model="firstName"> <br>
        名：<input type="text" v-model="lastName"> <br>
        <button @click="changeFullName">将全名改成li-si</button>
        全名：<span>{{ fullName }}</span> <br>

    </div>
</template>

<script lang="ts" setup name="Computed">

import { ref, computed } from 'vue'

//数据
let firstName = ref('zhang')
let lastName = ref('san')
// // 这么定义的fullName是一个计算属性，且是只读的
// let fullName = computed(() => {
//     console.log(1)
//     return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
// })
// 这么定义的fullName是一个计算属性，且是可读可写的
let fullName = computed({
    get() {
        return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
    },
    set(val) {
        const [str1, str2] = val.split('-')
        firstName.value = str1
        lastName.value = str2
        console.log(val)
    }
})

console.log(fullName)

function changeFullName() {
    fullName.value = 'li-si'
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