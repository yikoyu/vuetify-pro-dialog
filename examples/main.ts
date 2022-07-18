import Vue from 'vue'
import VCA from '@vue/composition-api'
import App from './App.vue'

import { createVuetify, createVuetifyDialog } from './vuetify'

const vuetify = createVuetify(Vue)
createVuetifyDialog(Vue, vuetify)

Vue.use(VCA)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
