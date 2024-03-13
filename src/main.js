import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/scss/bootstrap.scss'

import { date, currency } from '../src/methods/filters.js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$filters = {
  date,
  currency
}

app.use(createPinia())
app.use(router)

app.mount('#app')
