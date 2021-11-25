import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import VuetifyProDialog from 'vuetify-pro-dialog'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  lang: {
    locales: { zhHans },
    current: 'zhHans'
  }
})

Vue.use(VuetifyProDialog, { vuetify })

export default vuetify
