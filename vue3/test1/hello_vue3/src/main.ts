import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

//创建vue应用
const app = createApp(App)

//使用路由器
app.use(router)


app.mount('#app')