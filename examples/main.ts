import Vue from 'vue'
import App from './App.vue'

import Vuetify, { VDialog, VTextField, VIcon } from 'vuetify/lib'
import VuetifyProDialog from 'vuetify-pro-dialog'

const vuetify = new Vuetify()

Vue.use(Vuetify, {
  components: {
    VDialog,
    VTextField,
    VIcon
  }
})

Vue.use(VuetifyProDialog, {
  vuetify
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
