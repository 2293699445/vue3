# Day01——构建vue3项目及目录介绍

## 1.1 简要介绍

* 全程采用TypeScript + 组合式API +setup语法糖编码
* webpack与vite构建对比：webpack类似全加载，vite类似懒加载(按需加载)

## 1.2 创建一个vue3工程

* 基于 vue-cli创建

* 基于vite创建(推荐)

  * 首先确保具有node.js环境，否则没有npm这个命令，如果没有该环境去官网下载node.js,  可打开cmd输入node查看是否已经安装。

  * 在你指定的位置打开终端输入 

    ```powershell
    npm create vue@latest
    ```

     即可创建一个vue工程。

  * 下载依赖

    ```powershell
    npm i
    ```

  * 终端输入

    ```powershell
    npm run dev
    ```

    即可运行该项目。

## 1.3 vue项目目录结构介绍

*  项目名

  * .vscode

    * extensions.json：配置插件

  * public

    * favicon.ico：页签图标

  * src

    * assets：用于存放项目中使用的静态资源，比如图片、字体、样式表等。

    * components：枝叶组件

    * App.vue：根组件

      * .vue文件中所写的三种标签(html+js+css)

        template（html结构）、script（js交互）、style（css样式）

    * main.ts：用于创建前端应用

      ```tsx
      import './assets/main.css'
      
      import { createApp } from 'vue'
      import App from './App.vue'
      
      createApp(App).mount('#app')
      
      ```

      ​	**这里将形象的将createApp比作花瓶，App比作根，自己创建的xxx.vue视为根上的枝叶，mount比作花瓶摆放的位置。**

      ​	**createApp(App).mount(#app)：意为createApp在创建应用，每个应用都得有一个根组件App，创建完后成果摆在id为app的某个标签中。**

  * .gitignore：git的忽略文件

  * env.d.ts：不能删，ts不认识.jpg, .txt等类型的文件，该文件将几乎所有你要创建的文件类型都声明了，用于ts识别。

  * index.html：入口文件，相对于webpack创建的项目的启动文件main.ts。

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <link rel="icon" href="/favicon.ico">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vite App</title>
      </head>
      <body>
        <div id="app"></div>  <!--摆花盆的位置-->
        <script type="module" src="/src/main.ts"></script>  <!--引入src中的main.ts-->
      </body>
    </html>
    
    
    ```

  * package-lock.json：包管理文件或称依赖生成文件。

  * package.json：包管理文件或称依赖生成文件。

  * README.md：简单介绍工程的文件。

  * tsconfig.app.json：ts配置文件，不能随意删除。

  * tsconfig.app.json：ts配置文件，不能随意删除。

  * tsconfig.app.json：ts配置文件，不能随意删除。

  * vite.config.ts：整个工程的配置文件，安装插件，配置代理等。

## 1.4 基本操作

Ctrl+C：停掉脚手架

npm run dev：运行

npm i：安装所有的依赖

## 1.5 总结

* vite项目中，index.html是项目的入口文件，在项目最外层
* 加载index.html后，vite解析<script type="module" src="xxx">指向的JS.
* vue3中式通过createApp函数创建一个应用实例

## 1.6 手写src目录

1. 在新建的vue3工程中，删除src目录

2. 新建一个名为src的文件夹

3. 在src下新建文件App.vue，用于编写根组件 

   ```vue
   <template>
       <!-- html结构 -->
       <Person/>
       <Person/>
       <Person/>
   </template>
   
   <script lang="ts">
   import Person from './components/Person.vue'
   export default {
       name: 'App',   //组件名
       components: { Person } //注册新写的组件
   }
   </script>
   
   <style>
   /*样式 */
   .app {
       background-color: #ddd;
       box-shadow: 0 0 10px;
       border-radius: 10px;
       padding: 20px;
   }
   </style>
   ```

4. 在src下新建文件main.ts，用于创建前端应用

   ```ts
   import {createApp} from 'vue'
   import App from './App.vue'
   
   createApp(App).mount('#app')
   ```

5. 在src下新建文件夹components，用于存放编写的枝叶组件

6. 在components下新建Person.vue文件，用于编写一个名为Person的枝叶组件

```vue
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

    </div>
</template>

<script lang="ts">
export default {  //这个语法用于导出一个对象
    name: 'Person',   //组件名，这个属性指定了组件的名称
    data() {    //这个方法定义了组件的初始数据。 
        return {
            name: '张三',
            age: 18,
            tel: '1398888888'
        }
    },
    methods: {  //这个对象定义了组件中的方法。
        changeName() {
            this.name = 'zhang-san'
        },
        changeAge() {
            this.age += 1
        },
        showTel() {
            alert(this.tel)
        }
    }
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
```

7. npm run dev运行该项目