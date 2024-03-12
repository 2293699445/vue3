# Day05——路由

## 5.1 路由的理解

SPA的应用

## 5.2 基本切换效果

如何使用路由？

​	1.安装路由 npm i vue-router

​	2.新建文件夹router，创建文件index.ts

 3. 在文件中引入createRouters  

    ```js
    import {routers} from 'vue-router'
    ```

 4. 创建路由器, 调用createRouters函数

    ```tsx
    import Home from '@/components/Home.vue'
    import About from '@/components/About.vue'
    import News from '@/components/News.vue'
    
    const router = createRouter({
        //指定路由工作模式
        history:createWebHistory(),
        routes: [
            {
               path:'/home',
               component: Home
            },
            {
                path:'/news',
                component: News
             },
             {
                path:'/about',
                component: About
             },
            
        ]
    })
    ```

	5. 导出router

    ```js
    export default router
    ```

	6. 在main.ts中使用路由器
	
	```ts
	import { createApp } from 'vue'
	import App from './App.vue'
	
	import router from './router'
	
	
	const app = createApp(App)
	
	//使用路由器
	app.use(router)
	
	
	app.mount('#app')
	```
	
	7. RouterView占位
	
	   导入RouterView,在要显示的html结构中用该组件占位。
	
	   导入RouterLink，用RouterLink定义的标签点击时可以路由跳转。

## 5.3 两个注意点
* 路由组件通常存放在pages或views文件夹，一般组件通常存放在components文件夹。
* 通过点击导航，视觉效果上消失了的路由组件，默认是被卸载掉的，需要的时候再去挂载。

## 5.4 路由器工作模式
* history模式
   优点：URL更美观，不带#，跟接近传统的网站URL
   缺点：需要服务器端配合处理路径问题，否则刷新会有404错误。
   ```
      import {createWebHistory} from 'vue-router' 

      const router = createRouter({
         history:createWebHistory(),  //history模式
         .....
      })
   ```
* hash模式
   优点：兼容性更好，因为不要服务器端处理路径。
   缺点：URL带有#不太美观，且在SEO优化方面相对较差
   ```
      import {createWebHashHistory} from 'vue-router' 

      const router = createRouter({
         history:createWebHashHistory(),  //history模式
         .....
      })
   ```

## 5.5 to的两种写法
* 字符串写法
```<router-link active-class="active" to="/home">主页</router-link>```
* 对象写法
   * 名字跳转
      ```<router-link active-class="active" :to="{name:'xinwen'}">主页</router-link>```
   * path跳转
      ```<router-link active-class="active" :to="{path:'/home'}">主页</router-link>```

## 5.6 命名路由
* 说明：相当于给每个路由再起一个名字
* 使用：
   ```
   const router = createRouter({
    //指定路由工作模式
    history:createWebHistory(),
    routes: [
        {
           name:'主页',
           path:'/home',
           component: Home
        },
        {
            name:'xinwen',
            path:'/news',
            component: News
         },
         {
            name:'guanyu',
            path:'/about',
            component: About
         },
        
    ]
})
   ```
   ```
   <RouterLink :to="{name:'主页'}" active-class="active">首页</RouterLink>
   ```

## 5.7 嵌套路由

## 5.8query参数
* 父路由传参，子路由接收
* 在父路由中query传参的方式，在子路由后面添加'?'然后写上参数，参数之间用&连接
* 在子路由中接收参数的方式
   * 1.在子路由中导入useRoute函数
      ```import {useRoute} from 'vue-router'```
   * 2.调用useRouter函数,变量route接收前端路由及参数
      ```const route = useRoute()```
   * 3.使用route，父路由传来的参数放在route对象的query属性中，该query是一个对象，里面存放的是父路由传来的参数
      ```
        <ul class="news-list">
        <li>编号：{{router.query.id}}</li>
        <li>标题：{{router.query.title}}</li>
        <li>内容：{{router.query.content}}</li>
    </ul>
      ```
* query参数的两种写法
   * 1.普通写法
      ```<RouterLink :to="`/news/detail?id=${article.id}&title=${article.title}&content=${article.content}`">{{article.title}}</RouterLink>>```
   * 2.对象写法
      ```
      <RouterLink :to="{
                    path:'/news/detail',
                    query:{
                        id:article.id,
                        title:article.title,
                        content:article.content
                    }
                }">
                {{article.title}}
                </RouterLink>
      ```
## 5.9params参数
* params参数两个注意点：
   * 1. 需要在配置路由处占位，由于params传参可以直接在路由后面写参数的值，因此需要在配置路由处写上参数名进行占位。
   * 2. 在RouteLink标签的to属性中，需要传一个对象用于配置路由和参数，但是此时配置路由的属性不能写path，只能写name，前提是name在路由配置中已经写好。
   * 3. 不能传数组参数

## 5.10路由的props配置
* 作用：用于优化模板中使用路由参数值的复杂性
   * 1. 正常取值：可以看出取值用route.params.id的方式很复杂
   ```
      <ul class="news-list">
        <li>编号：{{route.params.id}}</li>
        <li>标题：{{route.params.title}}</li>
        <li>内容：{{route.params.content}}</li>
      </ul>
   ```
   * 2. 借助props取值
      * 第一种写法：将路由收到的所有params参数作为props传给路由组件 props：true
      * 第二种写法：函数写法，可以自己决定将什么作为props给路由组件
      * 第三种写法：对象写法
      ```
   const router = createRouter({
   //指定路由工作模式
   history: createWebHistory(),
   routes: [
      {
         name: 'xinwen',
         path: '/news',
         component: News,
         children: [
            {
               name: 'xiang',
               path: 'detail',  //子级路由不用加'/'
               component: Detail,

               // props:true  //第一种写法：只适用于params参数


               props(route) { //第二种写法：route中存放了路由的所有信息，包括params，query等，适用于所有参数情况
                  return route.query
               }

               // props: {  //第三种写法
               //    a: 100,
               //    b: 200,
               //    c: 300
               // }


            }
         ]
      }
   ]
})
      ```

## 5.11 replace属性
* 跳转的两个动作replace和push模式
   * push模式相当于浏览器中的前进后退效果
   * replace模式相当于无痕模式，没有前进后退效果，只有当前页面的路径
   * 添加replace属性，只需要在切换页面的标签上添加replace属性即可
   ```
      <div class="navigate">
            <RouterLink replace :to="{name:'主页'}" active-class="active">首页</RouterLink>
            <RouterLink replace :to="{path:'/news'}" active-class="active">新闻</RouterLink>
            <RouterLink replace to="/about" active-class="active">关于</RouterLink>
      </div>
   ```
## 5.12 编程式路由导航
* 作用：脱离<RouterLink>实现路由跳转 
## 5.13 重定向