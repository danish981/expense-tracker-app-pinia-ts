import './assets/style.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// todo : fix this error "Could not find a declaration file for module"
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(Toast)
app.mount('#app')
