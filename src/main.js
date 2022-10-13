import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import axios from "axios";
import store from './store';

import { testA } from 'stdui'
import 'element-plus/dist/index.css'
// import STDUI from 'stdui/lib/index/index'
// import 'stdui/lib/style/index.css'

// 引入弹框
import toast from './toast/index.js'

const app = createApp(App)
app.use(ElementPlus)
// app.use(STDUI)
app.use(testA)
app.use(toast)

app.use(router)
app.use(store)
app.mount('#app')

