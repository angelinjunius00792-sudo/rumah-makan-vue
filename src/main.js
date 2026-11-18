import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'
import { useMenuStore } from '@/stores/menu'
import { useOrderStore } from '@/stores/order'
import { usePurchaseStore } from '@/stores/purchase'
import './style.css'

const app = createApp(App)
app.use(createPinia())

useAuthStore().init()
useMenuStore().init()
useOrderStore().init()
usePurchaseStore().init()

app.use(router)
app.mount('#app')