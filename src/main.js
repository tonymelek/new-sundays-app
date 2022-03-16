import { createApp } from 'vue'
import {router} from './router.js'
import App from './App.vue'

createApp(App)
.mount('#app')
.use(router);
