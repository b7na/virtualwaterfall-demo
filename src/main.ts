// import { createApp } from "vue";
import "./style.css";
// import App1 from './App.vue'
// import App2 from "./App2.vue";
// import App3 from "./App3.vue";
// createApp(App1).mount("#app");
// createApp(App2).mount("#app");
// createApp(App3).mount("#app");

import { createApp } from 'vue'

import router from "./router/index" 
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App1 from './App1.vue'

const app = createApp(App1)

app.use(ElementPlus)
app.use(router).mount('#app')
