import './assets/main.css'
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { POSITION } from 'vue-toastification'

// Import the CSS or use your own!
import router from './router'
import App from './App.vue'

import '@/assets/main.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: true // Включает стили через @layer
        }
    }
})
app.use(Toast, {
    position: POSITION.TOP_CENTER
  })
app.mount('#app')
