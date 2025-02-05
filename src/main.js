import './assets/main.css'
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

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
app.mount('#app')
