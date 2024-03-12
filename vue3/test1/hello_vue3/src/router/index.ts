
//创建一个路由器，暴露出去

//第一步，引入createRouter
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '@/pages/About.vue'
import News from '@/pages/News.vue'
import Detail from '@/pages/Detail.vue'

//第二步：创建路由器
const router = createRouter({
   //指定路由工作模式
   history: createWebHistory(),
   routes: [
      {
         name: '主页',
         path: '/home',
         component: Home
      },
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
      },
      {
         name: 'guanyu',
         path: '/about',
         component: About
      },

   ]
})

export default router