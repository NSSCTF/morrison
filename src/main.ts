import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from "element-plus"
import 'element-plus/lib/theme-chalk/index.css'
import HighLight from '@/utils/highlight'
import i18n from '@/language/il8n'
import { highlight } from 'prismjs'

// import './plugins/element'
const app = createApp(App)
app.use(ElementPlus)
app.use(HighLight)
app.use(i18n)
app.use(store).use(router).mount('#app')
