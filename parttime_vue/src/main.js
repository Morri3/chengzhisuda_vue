import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'// 导入elementPlus
import 'element-plus/dist/index.css'// 导入elementPlus

// import Vant from 'vant' // 导入vant
// import 'vant/lib/index.css' // 导入vant
// import 'amfe-flexible' // 导入rem适配所需（用于移动端适配）

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
