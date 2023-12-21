import './assets/main.css'

import "vue-toastification/dist/index.css";

import { createApp } from 'vue'
import Toast from "vue-toastification";
import App from './App.vue'
import router from './router'
import Oruga from '@oruga-ui/oruga-next'
import primevue from 'primevue/config';


const app = createApp(App)


app.use(router).use(Toast, {}).use(Oruga).use(primevue)

app.mount('#app')
