import CreateMessage from './components/Message'
import CreateMessageBox from './components/MessageBox/index'
import { setVuetifyInstance, merge } from './utils'
import locale, { zhCN, enUS } from './locales'

import type { VueConstructor } from 'vue'
import type { default as Vuetify } from 'vuetify'
import type { InstallationMessageOptions } from './components/MessageBox/src/type'
import type { MessageBoxComp } from './components/MessageBox/src'
import type { MessageComp } from './components/Message/src'
import type { Locale } from './locales'

export interface VuetifyProDialog {
  message: MessageComp
  notify: MessageComp['notify']
  loading: MessageComp['loading']
  msgbox: MessageBoxComp
  confirm: MessageBoxComp['confirm']
  alert: MessageBoxComp['alert']
  prompt: MessageBoxComp['prompt']
  changeRtl: (type: boolean) => void
  locale: Locale
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
      text: () => locale.i18nRender('dialog.ok.text'),
      color: 'primary'
    },
    width: 450
  },
  confirm: {
    false: {
      text: () => locale.i18nRender('dialog.cancel.text'),
      color: 'error'
    },
    true: {
      text: () => locale.i18nRender('dialog.ok.text'),
      color: 'primary'
    },
    width: 450
  },
  prompt: {
    false: {
      text: () => locale.i18nRender('dialog.cancel.text'),
      color: 'error'
    },
    true: {
      text: () => locale.i18nRender('dialog.ok.text'),
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
    locale: locale,
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

export { zhCN, enUS, locale }
export { Message, MessageBox }
export default Plugin
