import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {SplashScreen} from '@capacitor/splash-screen'

import './assets/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
await SplashScreen.hide()