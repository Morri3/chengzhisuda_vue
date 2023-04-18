import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'// 导入elementPlus
import 'element-plus/dist/index.css'// 导入elementPlus
import '@/styles/index.scss'// 引入字体
import * as ElementPlusIconsVue from '@element-plus/icons-vue'// 导入icon图标
import axios from 'axios' // axios导入
import moment from 'moment'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// axios的配置
app.config.globalProperties.$axios = axios // 配置axios的全局引用
app.config.globalProperties.$moment = moment
// axios.defaults.baseURL = '/api'
// // axios.defaults.baseURL = 'http://114.55.239.213:8087/'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

app.use(store).use(router).use(ElementPlus).mount('#app')
// createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
