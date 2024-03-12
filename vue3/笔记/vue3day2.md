# Day02——Vue3核心语法1

## 2.1 OptionsAPI和CompositionAPI

1. 不同的API风格

   * Vue2的API设计是Options（配置）风格的。

   * Vue3的API设计是Composition（组合）风格的。

2. Options API的弊端

   * 在大型组件中，实现一个功能所需要的数据、方法、计算属性等选项会散布在不同的部分（data、methods、computed 等），如需新增或者修改一个功能，就需要分别修改：data、methods、computed等，不便于维护和复用。

3. Composition API的优势

   * 可以用函数的方式，更加优雅的组织代码，让相关功能的代码更加有序的组织在一起。
   
     

## 2.2 setup概述

1. setup 是 Vue3中一个新的配置项，值是一个函数，它是Compsition API表演的舞台，组件中所用到的：数据，方法，计算属性，监视等等，均配置在setup中。

2. 特点如下：

   * setup函数返回的对象中的内容，可直接在模板中使用。
   * **setup中访问this是undefined。**
   * setup函数会在beforeCreate之前调用，它是领先所有钩子执行的。

3. 应用setup

   ```js
   <script lang="ts">
   export default {  //这个语法用于导出一个对象
       name: 'Person',   //组件名，这个属性指定了组件的名称
       befroeCreate(){
           console.log('beforeCreate')
       }
       setup() {
           //console.log('setup') //setup比beforeCreate先打印
           //console.log(this) //setup函数中的this是undefined，Vue3中已经弱化this了
           // 数据  此时的数据不是响应式的
           let name = '张三'  
           let age = 18
           let tel = '13888888888'
           //方法
           function changeName(){
               name = 'zhang-san'  //注意：这样修改name，确实name被修改了，但name不是响应式的，因此页面没有任何变化
           }
           function changeAge(){
               age += 1  //注意：这样修改age，确实age被修改了，但age不是响应式的，因此页面没有任何变化
           }
           function showTel(){
               alert(tel)
           }
           return { name, age ,changeName,changeAge,showTel}
   
       }
   }
   </script>
   ```

4. setup函数的返回值

   * 通常setup函数的返回值是一个由数据组成的对象，通过模板将数据渲染出来。

     ```js
      return { name, age ,changeName,changeAge,showTel}
     ```

   * setup函数的返回值也可以是一个渲染函数，即返回一个函数，而该函数里的返回值不需要模板渲染，直接可以将返回值返回给前端页面。

     ```js
     return function(){
     	return '哈哈'  //前端页面显示‘哈哈’
     }
     ```

5. setup语法糖：

   * setup语法糖是为了简化setup函数的书写，那就是使用 `setup()` 函数的返回值直接作为模板中的响应式数据，而不需要显式地返回一个对象。简而言之，使用setup语法糖就无需再通过return返回数据，自动会返回所有数据。这种写法是 Vue 3 Composition API 的一种进化，使得编写组件变得更加简单和直观。
   * 在当前组件中再写一个script标签，通过setup和lang完成组件的逻辑设置和类型声明即可。

   ```js
   <script lang="ts">
       export default {
           name: 'Person'
       }
   </script >
   
   <script lang="ts" setup>  
       let name = '张三'
       let age = 18
       let tel = '13888888888'
       //方法
       function changeName() {
           name = 'zhang-san'  
       }
       function changeAge() {
           age += 1  
       }
       function showTel() {
           alert(tel)
       }
   </script>
   
   上述代码相当于下述中的代码
   <script lang="ts">
       export default {
           name: 'Person'
       }
       setup(){
           let name = '张三'
           let age = 18
           let tel = '13888888888'
           //方法
           function changeName() {
               name = 'zhang-san'  
           }
           function changeAge() {
               age += 1  
           }
           function showTel() {
               alert(tel)
           }
           return {name,age,tel,changeName,changeAge,showTel} //setup语法糖可以省略该步骤
       }
   </script>
   
   ```


6. 注意：

   * vue2中不能写多个根标签，vue3可以写多个根标签

   ![image-20240221142901471](C:\Users\于亮\AppData\Roaming\Typora\typora-user-images\image-20240221142901471.png)

   * **同时使用data与setup选项（易错易混）**

     * **data与setup可以同时存在**，且在data中可以通过this.调用setup中的值。而在setup中不可以调用data中的数据，因为setup是在组件初始化阶段最先被调用的。

     * ​    在 Vue 3 中，如果在同一个组件中同时使用 `data` 和 `setup` 选项，并且两者都定义了同名的响应式数据（比如都定义了一个名为 `name` 的数据），Vue 将会优先使用 `setup` 函数中返回的响应式数据。

       ​	这是因为 `setup` 函数是在组件初始化阶段最先被调用的（在任何其它组件选项如 `data`, `computed`, `methods` 之前执行），其返回的响应式数据或方法将直接暴露给组件的其余部分（包括模板）和组件的其他选项。因此，如果 `setup` 返回的对象中包含了某个属性，而 `data` 中也定义了同名的属性，那么 `setup` 中的属性会覆盖 `data` 中的属性。
       
       

## 2.3 ref创建：基本类型/对象类型的响应式数据

1. 作用：可以定义响应式变量，也可以定义响应式对象。

  2. **语法：let xxx = ref(初始值/初始对象)。**

  3. 返回值：返回一个RefImpl的实例对象，简称ref对象或ref，ref对象的属性是响应式的。

 	4. 注意点：
     * JS中操作数据需要：xxx.value，但模板中不需要 .value，直接使用即可。
     * 对于let name = ref(‘张三’)来说，name不是响应式的，name.value是响应式的。
     
 5. ref使用之基本类型：

    * 在script标签中导入ref

      ```js
      import {ref} from 'vue'
      ```

    * 在需要响应式变化的数据上加上ref

      ```js
      let name = ref('张三')
      let age = ref(18)   //一旦加上ref，该数据就变成响应式的数据
      ```

    * 在使用到响应式数据时需要通过.value才能使该修改后的响应式数据在前端显示

      ```js
      function changeAge() {
          age.value += 1  //注意：这样修改age，页面才会显示修改后的数据
      }
      ```

 	6. ref使用之对象类型(底层还是借助reactive实现响应式对象)：

     * 在script标签中导入ref

       ```js
       import {ref} from 'vue'
       ```

     * 在需要响应式变化的对象上加上ref

       ```js
       let car = ref({
           brand: '奔驰',   //{}内为原对象，经过reactive包裹后就成响应式对象了
           price: 100
       })
       let games = ref([
           { id: 'wegwegwe01', name: "王者荣耀" },
           { id: 'wegwegwe02', name: "穿越火线" },
           { id: 'wegwegwe03', name: "部落冲突" }
       ])
       ```

     * 在使用到响应式对象中的数据时需要通过.value才能使该修改后的对象中的数据在前端显示

       ```js
       function changePrice() {
           car.value.price += 10
       }
       function changeFirstGameName(){
           games.value[0].name = '流星蝴蝶剑'
       }
       ```

       

## 2.4 reactive创建：对象类型的响应式数据

1. 作用：只能定义响应式对象。

  2. **语法：let xxx = reactive(初始对象)。**

  3. 返回值：一个Proxy的实例对象，该实例对象是响应式的。

  4. 使用：

     * 在script标签中导入reactive

       ```js
       import {reactive} from 'vue'
       ```

     * 在需要响应式变化的对象上加上reactive

       ```js
       let car = reactive({
           brand: '奔驰',   // {}内为原对象，经过reactive包装后成为响应式对象
           price: 100
       })
       let games = reactive([
           { id: 'wegwegwe01', name: "王者荣耀" },
           { id: 'wegwegwe02', name: "穿越火线" },
           { id: 'wegwegwe03', name: "部落冲突" }
       ])
       ```

     * ```vue
       <template>
           <div class="Car">
               <h1>{{time}}</h1>
               <button @click = changeTime>修改时间</button>
               <h2>一辆{{ car.brand }}车，价值{{ car.price }}万</h2>
               <button @click="changePrice">修改汽车价格</button>
               <br>
               <h2>游戏列表</h2>
               <ul>
                   <li v-for="g in games" :key="g.id">{{g.name}}</li>
               </ul>
               <button @click="changeFirstGameName">修改游戏名字</button>
           </div>
       </template>
       
       <script lang="ts" setup name="CarType">
       
       import { reactive } from 'vue'
       import {ref} from 'vue'
       
       
       
       //数据
       let time = ref('2024年2月22日')  //基本类型的响应式数据
       let car = reactive({    //对象类型的响应式数据
           brand: '奔驰',   //{}内为原对象，经过reactive包裹后就成响应式对象了
           price: 100
       })
       let games = reactive([  //对象类型的响应式数据
           { id: 'wegwegwe01', name: "王者荣耀" },
           { id: 'wegwegwe02', name: "穿越火线" },
           { id: 'wegwegwe03', name: "部落冲突" }
       ])
       console.log(time)  
       console.log(car)  
       
       
       
       //方法
       function changePrice() {
           car.price += 10
       }
       function changeFirstGameName(){
           games[0].name = '流星蝴蝶剑'
       }
       function changeTime() {
           time.value = '2024年2月23日'
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
       ```

## 2.5 ref与reactive对比

1. 宏观角度：

   * ref用于定义：基本数据类型，对象类型数据
   * reactive用于定义：对象类型数据

2. 区别：

   * ref创建的变量必须使用.value（可以使用volar插件自动添加.value）。

     volar插件配置：打开vscode——>打开设置——>打开扩展——>找到volar——>找到Auto Insert：Dot Value并勾选即可

     如此以来，当使用ref创建的响应式变量时，输入该变量自动会补充上.value

   * reactive重新分配一个新对象，会失去响应式（可以使用Object.assign去整体替换）。

     * 不能将一个新对象直接赋值给reactive创建的对象，这样操作原对象是不会响应式变化的，但借助Object.assign该API可以实现。

     ```js
     let car = reactive({
         brand: '奔驰',   
         price: 100
     })
     function changeCar() {
         Object.assign(car, { brand: "宝马", price: 120 }) //此时的对象是可以响应式变化的
     }
     ```

     * 可以直接将一个新对象直接赋值给ref创建的对象，这样操作原对象是会响应式变化的。

     ```js
     let car = ref({
         brand: '奔驰',  
         price: 100
     })
     function changeCar() {
         car.value = {brand:'保时捷', price:200} //此时的对象是可以响应式变化的
     }
     ```

3. 使用原则：

   1. 若需要一个基本类型的响应式数据，必须使用ref。
   2. 若需要一个响应式对象，层级不深，ref和reactive都可以。
   3. 若需要一个响应式对象，且层级较深，推荐使用reactive。



## 2.6 toRefs与toRef

1. toRefs

   * toRefs是 Vue 3 中的一个函数，在 Vue 3 中，如果你有一个响应式对象，想要将其解构或者传递给一个函数，但同时又想保留其响应性，你可以使用 `toRefs` 函数。

     通常情况下，在 Vue 3 中，当你使用 `ref` 或 `reactive` 创建响应式对象时，如果你直接将其传递给另一个函数或者解构，它将失去响应性。这是因为解构或传递会将对象的属性解构出来，而不是保留整个对象的响应性。

     **toRefs返回一个对象，该函数会将原对象中的每一对键值对生成一个新的键值对，每个key不变，每个value都变成一个ref响应式对象，原对象的value存放在ref响应式对象的value属性中。**

   * 用法：

     * 导入toRefs：

     ```js
     import {toRefs} from 'vue' 
     ```

     * 将要解构的响应式对象当作参数放入toRefs函数中：

       ​	该函数的返回值为一个对象，该对象的key由原响应式对象的所有key组成，key对应的value为一个响应式对象，该对象的value属性为原对象的值。因此可以对该函数的返回值进行解构，解构出来的数据为响应式数据，**且修改该解构后的数据后原响应式对象的数据也会同样改变**。

   ```js
   let person = reactive({
       name: '张三',
       age: 19
   })
   let {name, age} = toRefs(person)  //解构toRefs函数的返回值
   function changeName(){
       name.value +='~'   //修改name后，该数据会响应式变化
   }
   function changeAge(){
       age.value += 1   //修改age后，该数据会响应式变化
   }
   -----------------------------------------------------------------------------------------------------
   //下述为一些说明
   //toRefs返回值为
   {
       name: ObjectRefImpl_1  //ObjectRefImpl为Ref响应式对象
       age:  ObjectRefImpl_2
   }
   ObjectRefImpl_1 = {
       value:19
       ...
   }
   ObjectRefImpl_2 = {
       value:'张三'
       ...
   }
   //let{name,age} = person 解构后
   name = ObjectRefImpl_1  //ObjectRefImpl为Ref响应式对象，可理解为ref(ObjectRefImpl),name.value为响应式数据
   age = ObjectRefImpl_2  //ObjectRefImpl为Ref响应式对象，age.value为响应式数据
   因此修改name.value，该数据在页面上是响应式变化的，且修改name.value='yu'后，person.value也='yu'	
   
   ```

2. toRef

   * 用法：

     * 导入toRef

       ```js
       import {toRefs} from 'vue' 
       ```

     * 将要解构的响应式对象中的key和该对象一起作为参数传入，这样解构出来的数据就是响应式的数据。

       ```js
       let nl = toRef(person, 'age')
       console.log(nl.value)
       ```

       

## 2.7 computed计算属性

1. 使用computed

   * 导入computed
   * 将执行computed函数的返回值赋值给变量fullName，在html中用插值语法显示该函数的返回值。

2. 计算属性有缓存，方法没有缓存

   ​	在computed函数中，每调用一次fullName就输出1，虽然调用了7次fullName，但是由于computed会缓存计算结果的原因故只计算了一次，故只输出一次1。而通过调用方法来实现该效果，由于函数没有缓存计算的原因故调用几次该方法就执行几次，就输出几次1。

   ```vue
   <template>
       <div class="Person">
           姓：<input type="text" v-model="firstName"> <br>
           名：<input type="text" v-model="lastName"> <br>
           全名：<span>{{ fullName }}</span> <br>
           全名：<span>{{ fullName }}</span> <br>
           全名：<span>{{ fullName }}</span> <br>
           全名：<span>{{ fullName }}</span> <br>
           全名：<span>{{ fullName }}</span> <br>
           全名：<span>{{ fullName }}</span> <br>
           全名：<span>{{ fullName }}</span> <br>
   
       </div>
   </template>
   
   <script lang="ts" setup name="Computed">
   
   import { ref, computed } from 'vue'
   
   //数据
   let firstName = ref('zhang')
   let lastName = ref('san')
   let fullName = computed(() => {
       console.log(1)
       return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
   })
   //方法
   function fullName2(){
       console.log(1)
       return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
   }
   </script>
   ```

3. 修改fullName

   ​	computed函数返回值为一个ref对象。

   ```js
   //这么定义的fullName是一个计算属性，且是只读的
   let fullName = computed(() => {
       console.log(1)
       return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
   })
   function changeFullName() {
       fullName.value = 'li-si'  //报错：无法为“value”赋值，因为它是只读属性。
   }
   
   //这么定义的fullName是一个计算属性，且是可读可写的
   let fullName = computed({
       get() {
           return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
       },
       set(val) {   //val的值为所修改的fullName.value值
           const [str1, str2] = val.split('-')
           firstName.value = str1
           lastName.value = str2
           console.log(val)
       }
   })
   function changeFullName() {
       fullName.value = 'li-si'
   }
   ```

   

