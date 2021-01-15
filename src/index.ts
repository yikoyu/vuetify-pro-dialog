import { VueConstructor } from 'vue'

import CreateMessage from './components/Message/index';

let vue
let vuetify

const install = (Vue: VueConstructor, opts: any = {}) => {
  vuetify = opts.vuetify
  vue = Vue

  if(!vuetify) {
    console.warn("The module VuetifyFloatingMessage needs vuetify instance. Use Vue.use(VuetifyFloatingMessage, { vuetify })");
    return;
  }

  Vue.prototype.$message = CreateMessage(vue, vuetify);
  
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const Message = CreateMessage(vue, vuetify)

export {
  Message
}
export default install
