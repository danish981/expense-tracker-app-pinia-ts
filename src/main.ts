import './assets/style.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'

// const app = createApp(App)

const app = createApp(App)

app.use(createPinia())
app.use(Toast)
app.mount('#app')
