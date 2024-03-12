# Day03——Vue3核心语法2

## 3.1 watch监视	

1. 作用：监视数据的变化

2. 特点：Vue3中的数据可以监视以下四种数据：

   * ref定义的数据。（基本类型、对象类型）
   * reactive定义的数据。（对象类型）
   * 函数返回值？（getter函数）
   * 一个包含上述内容的数组

3. 用法：

   * 在script标签中导入watch

     ```js
     import {watch} from 'vue'
     ```

   * 给定watch参数

     参数1：监视的对象

     参数2：回调函数（监视到某种情况后要执行的函数）

     参数3：配置对象（deep、immediate等等）

## 3.2 watch1_监视ref定义的基本类型数据

* 注意：

  * 1. 监视ref定义的基本数据类型时，传递该参数给watch函数时不需要.value
  * 2. watch函数返回一个停止监视的函数，可以调用该停止函数来停止监视。

* 实例代码：

  ```vue
  <template>
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
  </style> 
  
  
  
  ```

## 3.3 watch2_监视ref定义的对象类型数据

* 注意：

  * 1. 若修改的是ref定义的对象中的某个属性，newValue和oldValue都是新值，因为它们是同一个对象。
  * 2. 若修改的是ref定义的对象整体，newValue是新值，oldValue是旧值，因为不是同一个对象了。

* 实例代码：

  ```vue
  <template>
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
  import { watch, ref } from 'vue'
  //data
  let student = ref({
      name: '张三',
      age: 16
  })
  //methods
  function changeName() {
      student.value.name += '~'
  }
  function changeAge() {
      student.value.age += 1
  }
  function changeStudent() {
      student.value = { name: '小于', age: 22 }
  }
  //watch 监视学生对象
  let stopWatch = watch(student, (newValue, oldValue) => {
      console.log('student变化啦', newValue, oldValue)
  }, { deep: true, immediate: true })
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
  </style>
  ```

* 总结：监视ref定义的对象

  * 改变对象的属性，是不会监视任何数据的，同时因为对象地址值没变，因此newvalue&&oldvalue值一样（watch不关心对象属性的变化）

  * 改变对象整体，监视的是对象的地址值，对象地址值发生变化，因此newvalue&&oldvalue不同

  * 若想监视对象内部属性的变化，需要手动开启深度监视。给watch添加一个配置对象当第三个参数，在对象中添加deep属性（newvalue && oldvalue 相同）

  * 在第三个配置对象参数中添加immediate属性。添加该属性后，页面加载后不做任何变化直接监视学生整体和属性

  * 注意：

    * ref定义的对象，在不添加深度监视的情况时，改变对象的属性是不会被监视到的
    * reactive定义的对象，在不添加深度监视的情况时，改变对象的属性是会被监视到的

    

## 3.4 watch3_监视reactive定义的对象类型数据

* 注意：

  * 监视reactive定义的对象类型的数据，且默认是开启深度监视的（隐式创建深层监听），且这种隐式深层监听不可关闭。
  * 监视reactive定义的对象类型的数据，无论是对象内部的属性变化还是对象地址值发生变化，监测到的newValue与oldValue始终相同。

* 实例代码：

  ```vue
  <template>
      <div class="people">
          <h1>情况三：监视【reactive】定义的对象类型数据</h1>
          <h2>姓名：{{ people.name }}</h2>
          <h2>年龄：{{ people.age }}</h2>
          <!-- <h2>人的信息：{{ people }}</h2> -->
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
  
  <!-- 局部渲染 -->
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
  </style>
  ```

  

## 3.5 watch4_只监视ref或者reactive定义的对象类型数据中的某个属性。

* 注意：

  * 若该属性值不是对象类型，需要写成函数形式。
  * 若该属性值依然是对象类型，可直接被监视，也可写成函数，建议写成函数。
    * 当监视的属性值为对象类型时，修改该对象类型的属性时会被监视到，但是修改该对象这个整体时不会被监视到。
    * 用函数包装该对象类型后，只能监视到对象整体变化，不能监视到对象中的属性变化。
    * 要想既监视对象整体的变化，又监视对象属性的变化，可在函数包装该对象后，加上深度监视模式。

* 结论：

  * 监视的要是对象中的属性，那么最好写成函数形式，注意的是，若监视的对象中的属性值依旧是对象的话，建议写成函数并且手动开启深度监视

* 代码实例：

  ```vue
  
  
  <template>
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
  watch(() => people.car, (newValue, oldValue) => {
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
  </style> 
  ```

  



## 3.6 watch5_监视上述多个数据（数组）

* 注意：
  * 监视一个对象中的多个属性时，可以用数组的形式传递多个监视目标。



## 3.7 watchEffect

* 简介：使用watchEffect后，会立即执行一个函数，响应式的追踪其依赖，并在依赖更改时重新执行该函数。

* 区别：

  * watch必须明确指出监视的对象。
  * 不用明确指出监视的对象，在回调函数中使用到了某个数据，就会自动去帮你监视这个数据。

* ```vue
  <template>
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
  </style>  
  ```

  