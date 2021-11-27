import type { VueConstructor } from 'vue'

import VuetifyProDialog from 'vuetify-pro-dialog'
import type Vuetify from 'vuetify/lib'

export const createVuetifyDialog = (Vue: VueConstructor, vuetify: Vuetify) => {
  Vue.use(VuetifyProDialog, { vuetify })
}
