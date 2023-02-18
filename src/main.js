import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'// 导入elementPlus
import 'element-plus/dist/index.css'// 导入elementPlus
import '@/styles/index.scss'// 引入字体

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
