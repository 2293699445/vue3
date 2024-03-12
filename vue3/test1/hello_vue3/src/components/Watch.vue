<!-- <template>
    <div class="person">
        <h1>情况一：监视【ref】定义的【基本类型】数据</h1>
        <h2>当前求和为：{{ sum }}</h2>
        <button @click="changeSum">点我sum+1</button>
    </div>
</template>

<script lang="ts" setup name="person">
import { watch, ref } from 'vue'
//data
let sum = ref(0)
//methods
function changeSum() {
    sum.value += 1
}
//wathch
let stopWatch = watch(sum, (newValue, oldValue) => {  //箭头函数相当于无名函数
    if(newValue>=10) stopWatch()      //watch函数返回一个停止watch的函数，用stopWatch接收该停止watch的函数
    console.log('sum变化了', newValue, oldValue)
})
console.log(stopWatch)
</script >


<style scoped>
/*样式 */
.person {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}

button {
    margin: 0 5px;
}
</style> -->



<!-- <template>
    <div class="person">
        <h1>情况二：监视【ref】定义的【对象类型】数据</h1>
        <h2>姓名：{{ student.name }}</h2>
        <h2>年龄：{{ student.age }}</h2>
        <button @click="changeName">点我改名字</button>
        <button @click="changeAge">点我改年龄</button>
        <button @click="changeStudent">点我修改学生</button>
    </div>
</template>

<script lang="ts" setup name="person">
import { watch, ref,reactive } from 'vue'
//data
let student = reactive({
    name: '张三',
    age: 16
})
//methods
function changeName() {
    student.name += '~'
}
function changeAge() {
    student.age += 1
}
function changeStudent() {
    student = { name: '小于', age: 22 }
}
//watch 监视学生对象
let stopWatch = watch(student, (newValue, oldValue) => {
    console.log('student变化啦', newValue, oldValue)
})
</script >


<style scoped>
/*样式 */
.person {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}

button {
    margin: 0 5px;
}
</style> -->

<!-- <template>
    <div class="people">
        <h1>情况三：监视【reactive】定义的对象类型数据</h1>
        <h2>姓名：{{ people.name }}</h2>
        <h2>年龄：{{ people.age }}</h2>
        <button @click="changeName">点我改名字</button>
        <button @click="changeAge">点我改年龄</button>
        <button @click="changePeople">点我改整个人</button>
        <br>
        <h2>测试：{{obj.a.b.c}}</h2>
        <button @click="changeTest">点我改变法号</button>
    </div>
</template>

<script lang="ts" setup name="Watch">
//导入
import { reactive, watch } from 'vue'
//数据
let people = reactive({
    name: '小于',
    age: 22
})
let obj = reactive({
    a: {
        b: {
            c: 666
        }
    }
})
//方法
function changeName() {
    people.name += '~'
}
function changeAge() {
    people.age += 1
}
function changePeople() {
    // people = {           //可以给reactive定义的对象重新分配，但是失去响应性
    //     name: 'yu',
    //     age: 18
    // }
    Object.assign(people, { name: 'yu', age: 18 }) //这样操作后，对象的地址值没有变化，因此watch监视的对象新旧值一样，
}
function changeTest(){
    obj.a.b.c = 888
}
//监视
let stopWatch = watch(people, (newValue, oldValue) => {   //这样监视reactive定义的对象，如何监测到对象整体变化的新旧值？
    console.log('person变化了', newValue, oldValue)
})
watch(obj,(newValue, oldValue)=>{
    console.log('obj变化了', newValue, oldValue)
})
</script>

<style scoped>   
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




<!-- <template>
    <div class="people">
        <h1>情况四：监视【reactive】或【ref】定义的对象类型中的某个属性</h1>
        <h2>姓名：{{ people.name }}</h2>
        <h2>年龄：{{ people.age }}</h2>
        <h2>汽车：{{ people.car.c1 }}、{{ people.car.c2 }}</h2>
        <button @click="changeName">点我改名字</button>
        <button @click="changeAge">点我改年龄</button>
        <button @click="changeC1">点我改第一台车</button>
        <button @click="changeC2">点我改第二台车</button>
        <button @click="changeCar">点我改所有车</button>
    </div>
</template>

<script lang="ts" setup name="Watch">
//导入
import { reactive, watch } from 'vue'
//数据
let people = reactive({
    name: '小于',
    age: 22,
    car: reactive({
        c1: '奔驰',
        c2: '宝马',
    })
})
//方法
function changeName() {
    people.name += '~'
}
function changeAge() {
    people.age += 1
}
function changeC1() {
    people.car.c1 = '奥迪'
}
function changeC2() {
    people.car.c2 = '大众'
}
function changeCar() {
    people.car = { c1: '雅迪', c2: '爱玛' }
}

//监视 ,情况四：监视响应式对象中的某个属性，且该属性是基本类型的，要写成函数式
watch(() => people.name, (newValue, oldValue) => {
    console.log('person变化了', newValue, oldValue)
})
//监视 ,情况四：监视响应式对象中的某个属性，且该属性是对象类型的，可以直接写，也能写函数，更推荐写函数
watch([() => people.car.c1,()=>people.car.c2], (newValue, oldValue) => {  
    console.log('person变化了', newValue, oldValue)
}, { deep: true })
</script>

<style scoped>   .people {
       background-color: skyblue;
       box-shadow: 0 0 10px;
       border-radius: 10px;
       padding: 20px;
   }

   button {
       margin: 0 5px;
   }
</style>  -->

<!-- <template>
    <div class="people">
        <h1>需求：当水温达到60度，或水位达到80cm时，给服务器发请求</h1>
        <h2>当前水温：{{ temp }}度</h2>
        <h2>当前水位：{{ height }}厘米</h2>
        <button @click="changeTemp">水温+10</button>
        <button @click="changeHeight">水位+10</button>
    </div>
</template>

<script lang="ts" setup name="Watch">
//导入
import { ref, reactive, watch,watchEffect} from 'vue'
//数据
let temp = ref(10)
let height = ref(0)
//方法
function changeTemp() {
    temp.value += 10
}
function changeHeight() {
    height.value += 10
}
//监视
// watch([temp, height], (value) => {
//     let [newTemp,newHeight] = value 
//     if (newTemp >= 60 || newHeight >= 100){
//         console.log('正在发送请求')
//     }

// })
watchEffect(()=>{
    if(temp.value >=60 ||height.value >=100){
        console.log('给服务器发请求')
    }
})

</script>

<style scoped>   .people {
       background-color: skyblue;
       box-shadow: 0 0 10px;
       border-radius: 10px;
       padding: 20px;
   }

   button {
       margin: 0 5px;
   }
</style>     -->

<!-- <template>
    <div class="people">
        <h1>中国</h1>
        <h2 ref="title2">北京</h2>
        <h3>尚硅谷</h3>
        <button @click="showLog">点我输出h2这个元素</button>
    </div>
</template>

<script lang="ts" setup name="Watch">
import {ref} from 'vue'
let title2 = ref()
function showLog(){
    console.log(title2.value)
}
</script>

<style scoped>   .people {
       background-color: skyblue;
       box-shadow: 0 0 10px;
       border-radius: 10px;
       padding: 20px;
   }

   button {
       margin: 0 5px;
   }
</style>    -->


