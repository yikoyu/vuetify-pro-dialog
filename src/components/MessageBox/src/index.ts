import component from './index.vue'
import { VDialog, VCard, VCardText, VCardActions, VToolbar, VToolbarTitle, VSpacer, VBtn, VTextField, VIcon } from 'vuetify/lib'

import { VueConstructor } from 'vue'
import { MessageBoxOption } from './index.interface'

let Vue: VueConstructor // 定义传入vue
let settings // 默认按钮
let vuetify // 定义传入vuetify
let instance // 定义当前实例
let instances: any[] = []
let seed = 1 // 序号

const MessageBox = (options: MessageBoxOption): Promise<boolean> => {
  if (typeof options !== 'object') {
    options = {}
  }

  const Constructor = Vue.extend(component)

  instance = new Constructor({
    vuetify,
    components: {
      // VDialog: Vue.extend(VDialog),
      VCard: Vue.extend(VCard),
      VCardText: Vue.extend(VCardText),
      VCardActions: Vue.extend(VCardActions),
      VToolbar: Vue.extend(VToolbar),
      VToolbarTitle: Vue.extend(VToolbarTitle),
      VSpacer: Vue.extend(VSpacer),
      VBtn: Vue.extend(VBtn)
      // VTextField: Vue.extend(VTextField),
      // VIcon: Vue.extend(VIcon),
    },
    propsData: {
      ...options
    }
  })
  instance.id = 'messagebox_' + seed++
  instance.isActive = true
  instances.push(instance)

  const container = document.querySelector('[data-app=true]') || document.body
  container.appendChild(instance.$mount().$el)

  /* eslint-disable no-async-promise-executor */
  return new Promise(async (resolve, reject) => {
    const item = instances.find(k => k.id === instance.id)
    item.handleAction = async (key: 'confirm' | 'cancel') => {
      if (['confirm', 'cancel'].includes(key)) {
        resolve(key === 'confirm')
        item.isActive = false
        item.disabled = false
        instances = instances.filter(k => k.id !== seed)
      } else {
        reject('key is error')
        item.disabled = false
      }
    }
  })
}

MessageBox.confirm = (text: string, title?: string | MessageBoxOption, options?: MessageBoxOption) => {
  if (typeof options !== 'object') {
    options = {}
  }

  if (typeof title === 'object') {
    options = title
    title = options.title
  } else if (title === undefined) {
    title = ''
  }

  const actions = {
    false: {
      text: options?.actions?.false?.text || settings.confirm?.false?.text,
      color: options?.actions?.false?.color || settings.confirm?.false?.color
    },
    true: {
      text: options?.actions?.true?.text || settings.confirm?.true?.text,
      color: options?.actions?.true?.color || settings.confirm?.true?.color
    }
  }

  return MessageBox({
    ...options,
    actions: actions,
    width: options?.width || settings?.alert?.width,
    title,
    text,
    $type: 'confirm'
  })
}

MessageBox.alert = (text: string, title?: string | MessageBoxOption, options?: MessageBoxOption) => {
  if (typeof options !== 'object') {
    options = {}
  }

  if (typeof title === 'object') {
    options = title
    title = options.title
  } else if (title === undefined) {
    title = ''
  }

  const actions = {
    false: {
      text: options?.actions?.false?.text || settings.confirm?.false?.text,
      color: options?.actions?.false?.color || settings.confirm?.false?.color
    },
    true: {
      text: options?.actions?.true?.text || settings.confirm?.true?.text,
      color: options?.actions?.true?.color || settings.confirm?.true?.color
    }
  }

  return MessageBox({
    ...options,
    actions: actions,
    width: options?.width || settings?.alert?.width,
    title,
    text,
    $type: 'alert'
  })
}

MessageBox.prompt = (text: string, title?: string | MessageBoxOption, options?: MessageBoxOption) => {
  if (typeof options !== 'object') {
    options = {}
  }

  if (typeof title === 'object') {
    options = title
    title = options.title
  } else if (title === undefined) {
    title = ''
  }

  const actions = {
    false: {
      text: options?.actions?.false?.text || settings.confirm?.false?.text,
      color: options?.actions?.false?.color || settings.confirm?.false?.color
    },
    true: {
      text: options?.actions?.true?.text || settings.confirm?.true?.text,
      color: options?.actions?.true?.color || settings.confirm?.true?.color
    }
  }

  return MessageBox({
    ...options,
    actions: actions,
    width: options?.width || settings?.alert?.width,
    title,
    text,
    $type: 'prompt'
  })
}

MessageBox.closeAll = () => {
  if (!instances.length) return
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].isActive = false
  }
  instances = []
}

export default (v: VueConstructor, vtify, a) => {
  Vue = v
  vuetify = vtify
  settings = a
  return MessageBox
}
