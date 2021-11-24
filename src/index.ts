import CreateMessage from './components/Message'
import CreateMessageBox from './components/MessageBox/index'
import { setVuetifyInstance, merge } from './utils'

import type { VueConstructor } from 'vue'
import type { default as Vuetify } from 'vuetify'
import type { InstallationMessageOptions } from './components/MessageBox/src/type'
import type { MessageBoxComp } from './components/MessageBox/src'
import type { MessageComp } from './components/Message/src'

export interface VuetifyProDialog {
  message: MessageComp
  notify: MessageComp['notify']
  loading: MessageComp['loading']
  msgbox: MessageBoxComp
  confirm: MessageBoxComp['confirm']
  alert: MessageBoxComp['alert']
  prompt: MessageBoxComp['prompt']
  changeRtl: (type: boolean) => void
  // setLocale: (locale: string) => void
  // setLocaleMessage: (locale: string, msg: { [x: string]: string }) => void
}

export interface InstallationOptions extends InstallationMessageOptions {
  vuetify: Vuetify
}

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: VuetifyProDialog
  }
}

let options: InstallationMessageOptions = {
  alert: {
    true: {
      // text: () => i18nRender('dialog.ok.text'),
      text: '确认',
      color: 'primary'
    },
    width: 450
  },
  confirm: {
    false: {
      // text: () => i18nRender('dialog.cancel.text'),
      text: '取消',
      color: 'error'
    },
    true: {
      // text: () => i18nRender('dialog.ok.text'),
      text: '确认',
      color: 'primary'
    },
    width: 450
  },
  prompt: {
    false: {
      // text: () => i18nRender('dialog.cancel.text'),
      text: '取消',
      color: 'error'
    },
    true: {
      // text: () => i18nRender('dialog.ok.text'),
      text: '确认',
      color: 'primary'
    },
    width: 450
  }
}

const install = (Vue: VueConstructor, opts: InstallationOptions) => {
  const vuetify = opts.vuetify

  setVuetifyInstance(opts.vuetify)

  options = merge({}, options, opts)

  if (!vuetify) {
    console.warn('The module VuetifyProDialog needs vuetify instance. Use Vue.use(VuetifyProDialog, { vuetify })')
    return
  }

  const msg = CreateMessage()
  const msgbox = CreateMessageBox(options)

  const _dialog: VuetifyProDialog = {
    message: msg,
    notify: msg.notify,
    loading: msg.loading,
    msgbox: msgbox,
    confirm: msgbox.confirm,
    alert: msgbox.alert,
    prompt: msgbox.prompt,
    // setLocale: setLocale,
    // setLocaleMessage: setLocaleMessage,
    changeRtl: (type: boolean) => {
      if (vuetify) {
        vuetify.preset.rtl = type
      }
    }
  }

  Vue.prototype.$dialog = _dialog
}

const Plugin = {
  install
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}

const Message = CreateMessage()
const MessageBox = CreateMessageBox(options)

// export { zhCN, enUS, setLocale, setLocaleMessage }
export { Message, MessageBox }
export default Plugin
