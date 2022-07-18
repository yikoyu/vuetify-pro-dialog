import type { VueConstructor } from 'vue'

import Vuetify from 'vuetify/lib'
import VuetifyProDialog from 'vuetify-pro-dialog'

export const createVuetify = (Vue: VueConstructor): Vuetify => {
  Vue.use(Vuetify)

  return new Vuetify()
}

export const createVuetifyDialog = (Vue: VueConstructor, vuetify: Vuetify) => {
  Vue.use(VuetifyProDialog, { vuetify })
}
