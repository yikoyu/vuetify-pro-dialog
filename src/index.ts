import { VueConstructor } from 'vue'

import CreateMessage from './components/Message/index';
import CreateMessageBox from './components/MessageBox/index';

let options = {
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

  delete opts.vuetify
  options = Object.assign({}, options, opts)

  if(!vuetify) {
    console.warn("The module VuetifyProDialog needs vuetify instance. Use Vue.use(VuetifyProDialog, { vuetify })");
    return;
  }

  const msg = CreateMessage(vue, vuetify)
  const msgbox = CreateMessageBox(vue, vuetify, options)

  Vue.prototype.$dialog = {
    message: msg,
    notify: msg.notify,
    loading: msg.loading,
    msgbox: msgbox,
    confirm: msgbox.confirm,
    alert: msgbox.alert,
    prompt: msgbox.prompt,
    changeRtl: (type: boolean) => {
      if (vuetify) {
        vuetify.preset.rtl = type
      }
    }
  }
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
