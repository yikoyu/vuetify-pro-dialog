import { VueConstructor } from 'vue'

import CreateMessage from './components/Message/index';
import CreateMessageBox from './components/MessageBox/index';

const options = {
  confirm: {
    false: {
      text: '取消',
    },
    true: {
      text: '确认',
      color: 'primary'
    },
    width: 450
  },
  alert: {
    true: {
      text: '确认',
      color: 'primary'
    },
    width: 450
  },
}

let vue
let vuetify

const install = (Vue: VueConstructor, opts: any = {}) => {
  vuetify = opts.vuetify
  vue = Vue

  if(!vuetify) {
    console.warn("The module VuetifyProDialog needs vuetify instance. Use Vue.use(VuetifyFloatingMessage, { vuetify })");
    return;
  }

  Vue.prototype.$message = CreateMessage(vue, vuetify);
  Vue.prototype.$confirm = CreateMessageBox(vue, vuetify, options);
  
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const Message = CreateMessage(vue, vuetify)
const MessageBox = CreateMessageBox(vue, vuetify, options)

export {
  Message,
  MessageBox
}
export default install
