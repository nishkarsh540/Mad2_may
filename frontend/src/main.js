import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

const BASE_API_URL = 'http://127.0.0.1:5000'

axios.defaults.baseURL = BASE_API_URL


createApp(App).use(router).mount('#app')
