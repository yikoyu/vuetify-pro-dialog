import Vue from 'vue'
import VCA, { createApp, h } from '@vue/composition-api'
import App from './App.vue'

import vuetify from './core/vuetify'

Vue.use(VCA)

const app = createApp({
  vuetify,
  render: () => h(App)
})
app.mount('#app')
