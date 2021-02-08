import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from "element-plus"
import 'element-plus/lib/theme-chalk/index.css'
import HighLight from '@/utils/highlight'
// import './plugins/element'

const app = createApp(App)
app.use(store).use(router).use(ElementPlus).use(HighLight).mount('#app')