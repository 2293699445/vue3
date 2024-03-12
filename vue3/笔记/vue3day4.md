# Day04——Vue3核心语法3

## 4.1 标签的ref属性（给节点打标识）

* 作用：用于注册模板引用
  * **用在普通DOM标签上，获取的是DOM节点**
  * **用在组件标签上，获取的是组件实例对象**

### 4.1.1ref作用于普通标签上

* 问题引入：

  当在子组件中用到了某个id，在父组件中也用到了这个id，然后试图去操作子组件中的这个id所标记的标签元素，但发现操作的是父组件中的这个id所标记的标签元素，这就牵涉到了id标记冲突。

  ```vue
  <!-- 父组件 -->
  <template>
      <h2 id="title2">OK</h2>
      <Ts />
  </template>
  
  <script lang="ts" setup name="App">
  
  import Ts from './components/TsTest.vue'
  
  </script>
  
  ```

  ```vue
  <!-- 子组件 -->
  <template>
      <div class="people">
          <h1>中国</h1>
          <h2 id="title2">北京</h2>
          <h3>尚硅谷</h3>
          <button @click="showLog">点我输出h2这个元素</button>
      </div>
  </template>
  
  <script lang="ts" setup name="Ref">
  
  function showLog(){
      console.log(document.getElementById("title2"))  //打印的是<h2 id="title2">OK</h2>
  }
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
  </style>
  ```

* 引入ref标记：

  1. 父组件同上。

  ```vue
  <!-- 子组件 -->
  <template>
      <div class="people">
          <h1>中国</h1>
          <h2 ref="title2">北京</h2>   <!--ref标记-->
          <h3>尚硅谷</h3>
          <button @click="showLog">点我输出h2这个元素</button>
      </div>
  </template>
  
  <script lang="ts" setup name="Ref">
  //导包
  import {ref} from 'vue'
  //数据
  let title2 = ref()    //title2用于存储ref标记的内容，变量名title2必须与ref标记的相同
  //方法
  function showLog(){
      console.log(title2.value)                         //打印<h2>北京</h2>
      console.log(document.getElementById("title2"))    //<h2 id="title2">OK</h2>
  }
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
  </style>
  
  
  ```

  2. 父组件也用ref=title2标记h2标签

     ```vue
     <!-- 父组件 -->
     <template>
         <h2 ref="title2">OK</h2>
         <button @click=showLog>点我输出h2</button>
         <Ts />
     </template>
     
     <script lang="ts" setup name="App">
     
     import Ts from './components/TsTest.vue'
     import {ref} from 'vue'
     let title2 = ref()
     function showLog(){
         console.log(title2.value)    //打印<h2>OK</h2>
     }
     </script>
     
     
     ```

     子组件中console.log(title2.value) 打印结果同上。

     **因为在父组件中定义的变量title2与子组件中定义的变量title2不是同一个，因此存储的ref标记的内容也不同。**（父子组件中变量可以相同，id不能相同）

### 4.1.2 ref作用于组件标签上

* **注意：父组件不能拿子组件实例中的数据，子组件中的数据被保护隐藏起来了，子组件主动暴露出来的数据父组件才能看到。**

```vue
<!--父标签 -->
<template>
    <h2 ref="title2">OK</h2>
    <button @click=showLog>点我输出h2</button>
    <Ts ref="ren" />       <!--ref标记组件-->
</template>

<script lang="ts" setup name="App">

import Ts from './components/TsTest.vue'
import { ref } from 'vue'
let title2 = ref()
let ren = ref()     //变量ren存放ref标记的Ts组件实例对象
function showLog() {
    console.log(ren.value)    //打印结果为Ts组件实例对象
    console.log(ren.value.c)  //打印结果为Ts组件实例中的a变量的值
}
</script>

```

```vue
<!--子标签 -->
<template>
    <div class="people">
        <h1>中国</h1>
        <h2 ref="title2">北京</h2>
        <h3>尚硅谷</h3>
        <button @click="showLog">点我输出h2这个元素</button>
    </div>
</template>

<script lang="ts" setup name="Ref">
//导包
import { ref, defineExpose } from 'vue'     //导入defineExpose
//数据
let title2 = ref()
let a = ref(0)
let b = ref(1)
let c = ref(2)
//方法
function showLog() {
    console.log(title2.value)
}
defineExpose({a,b,c})           //子组件主动暴露数据
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
</style>
```



## 4.2 接口—泛型—自定义类型

* 注意：

  * 定义一个接口并暴露

    ```ts
    export interface PersonInter{
        id:string,
        name:string,
        age:number
    }
    ```

    **根据接口规范定义变量**

    ```ts
    let person: PersonInter = { id: 'fawegweg01', name: '张三', age: 60 } //定义一个变量person，要符合PersonInter的规范
    ```

    **根据接口规范定义数组变量**

    ```ts
    let personList: PersonInter[] = [  //法1数组
        { id: 'asdgweg01', name: '张三', age: 60 },
        { id: 'asdgweg02', name: '李四', age: 30 },
        { id: 'asdgweg03', name: '王五', age: 20 },
    ]
    let personList: Array<PersonInter> = [  //法2泛型
        { id: 'asdgweg01', name: '张三', age: 60 },
        { id: 'asdgweg02', name: '李四', age: 30 },
        { id: 'asdgweg03', name: '王五', age: 20 },
    ]
    // 法3自定义类型
    export type Persons = Array<PersonInter>
    let personList: Persons = [  
        { id: 'asdgweg01', name: '张三', age: 60 },
        { id: 'asdgweg02', name: '李四', age: 30 },
        { id: 'asdgweg03', name: '王五', age: 20 },
    ]
    ```

  * 定义一个带规范的数组有三种写法

    * 用泛型Array<Interface>
    * 用数组interface[]
    * 用自定义类型 export type Persons = Array<Interface> , let personList:Persons = [{},{}]

## 4.3 props使用

1. 请先看用reactive定义的数组如何实现规范

   ```js
   //method1
   let personList: PersonInter[] = reactive([        //定义一个变量personList是数组类型
        { id: 'asdgweg01', name: '张三', age: 60 },
        { id: 'asdgweg02', name: '李四', age: 30 },
        { id: 'asdgweg03', name: '王五', age: 20 },
    ])
   
   //method2
   let personList = reactive<Persons>([             //定义一个变量personList是数组类型
       { id: 'asdgweg01', name: '张三', age: 60 },
       { id: 'asdgweg02', name: '李四', age: 30,skill:'跳' },
       { id: 'asdgweg03', name: '王五', age: 20,skill:'rap' },
   ])
   ```

2. 可选属性

   在创建实现了某个接口的对象时，可以选择性地包含或不包含某些属性，通过添加一个?设置可选属性。比如下述接口中的skill属性

   ```tsx
   //定义一个接口，用于限制person对象的具体属性
   export interface PersonInter{
       id:string,
       name:string,
       age:number,
       skill?:string    //设置可选属性
   }
   // 一个自定义类型
   export type Persons = Array<PersonInter>
   ```

   ```js
   let personList = reactive<Persons>([ 
       { id: 'asdgweg01', name: '张三', age: 60 },        //实现上述接口的该对象就可以没有skill属性
       { id: 'asdgweg02', name: '李四', age: 30,skill:'跳' },
       { id: 'asdgweg03', name: '王五', age: 20,skill:'rap' },
   ])
   ```

3. **Props的使用**     

   **父组件可以在使用子组件的时候往子组件中传数据，子组件可以接收并使用。**

   * 1.在使用子组件时，传入数据若干

     ```vue
     <template>
         <h1>欢迎来到Vue!</h1>
         <Ts a="请看：" :list="personList" c="2024/2/29" />    <!--往子组件中传入数据a,list,c -->
     </template>
     
     <script lang="ts" setup name="App">
     import { reactive } from 'vue'
     import Ts from './components/TsTest.vue'
     import Persons from '@/types'
     
     //reactive类型规范
     let personList = reactive<Persons>([ 
         { id: 'asdgweg01', name: '张三', age: 60 },
         { id: 'asdgweg02', name: '李四', age: 30, skill: '跳' },
         { id: 'asdgweg03', name: '王五', age: 20, skill: 'rap' },
     ])
     </script>
     ```

   * 2.在子组件中导入defineProps，并且使用defineProps接收数据

     ```vue
     <template>
         <div class="person">
             <h2>{{ a }}Props的使用</h2>     <!--使用接收到的参数a -->
             <h4>{{ c }}</h4>           <!--使用接收到的参数b -->
             <ul>     <!--使用接收到的参数list -->
                 <li v-for="item in list" :key="item.id">姓名:{{ item.name }}， 年龄:{{ item.age }}，特长：{{item.skill}}</li>  
             </ul>
         </div>
     </template>
     
     <script lang="ts" setup name="Ts">
     
     //导入
     import { type  PersonInter, type Persons } from '@/types'
     import { reactive, defineProps } from 'vue'                //导入defineProps
     
     //数据
     let person: PersonInter = { id: 'fawegweg01', name: '张三', age: 60 } 
     
     //接收一个参数
     // defineProps(['a'])
     
     //只接收一个参数并保存
     // let param1 = defineProps(['a'])
     
     //接收多个参数
     //defineProps(['a', 'list','c'])       //接收父组件的多个参数
     
     //接收参数+限制类型
     //defineProps<{ list: Persons, a: string, c: string }>()   //限制传过来的list必须是自定义Persons类型的，a和c必须是string类型的
     
     //接收参数+限制类型+限制必要性+指定默认值
     withDefaults(defineProps<{ list?: Persons, a: string, c?: string }>(),{list:()=>{
         [
         {name:'喜羊羊',age:10},  //?代表该数据可传可不传，用于限制必要性；在withDefaults(defineProps<>(),{})中，defineProps函数用于接收参数+限制类型+限制必要性，withDefaults()函数第二个参数传入一个对象，用于指定父组件未传参数时的默认值。
         {name:'美羊羊',age:8},
     ]
     }})
         
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
     ```

## 4.4 生命周期  

## 4.5 hooks

