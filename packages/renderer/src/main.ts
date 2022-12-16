import { createApp } from 'vue'
// i18n
import i18n from '@/locales'
// Store
import { pinia } from '@/store'
// Router
import router from '@/router'
/* Quasar */
import { Quasar, Dialog, Notify } from 'quasar'
// Import Quasar css
import 'quasar/src/css/index.sass'
// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css'
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css'
import '@quasar/extras/mdi-v6/mdi-v6.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/eva-icons/eva-icons.css'
import '@quasar/extras/themify/themify.css'
import '@quasar/extras/line-awesome/line-awesome.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'
// Global style
import '@/styles/index.scss'
import App from './App.vue'

const app = createApp(App)
app.use(i18n)
app.use(pinia)
app.use(router)
app.use(Quasar, {
  plugins: {
    Dialog,
    Notify,
  }, // import Quasar plugins and add here
})
app.mount('#app')
