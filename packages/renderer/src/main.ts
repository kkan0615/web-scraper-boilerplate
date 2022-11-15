import { createApp } from 'vue'
// Router
import router from '@/router'
/* Quasar */
import { Quasar } from 'quasar'
// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

// Global style
import '@/styles/index.scss'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})
app.mount('#app')
