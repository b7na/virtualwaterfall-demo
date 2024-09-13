import { createApp } from "vue";
import { createPinia   } from "pinia";
import "./style.css";
import App from './App.vue'

import ElementPlus from 'element-plus'
import router from './router/index.ts'
import 'element-plus/dist/index.css'
const app=createApp(App)
const pinia=createPinia()
app.use(ElementPlus);
app.use(pinia);
app.use(router);

app.mount("#app");
