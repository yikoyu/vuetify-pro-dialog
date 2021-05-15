import component from './index.vue'
import { VSnackbar, VBtn, VIcon, VProgressCircular } from 'vuetify/lib'

import { VueConstructor } from 'vue'
import { VuetifyProMessageOptions, MessageType } from 'types/message'

const messageHeight = 45
let Vue: VueConstructor // 定义传入vue
let vuetify // 定义传入vuetify
let instance // 定义当前实例
const instances: any[] = [] // 目前的message列表
let seed = 1 // 序号

function createTypeMessage() {
  ;['success', 'warning', 'info', 'error'].forEach(type => {
    Message[type] = (text: string, options?: VuetifyProMessageOptions) => {
      if (typeof options !== 'object') {
        options = {}
      }

      options.type = type as MessageType
      return Message(text, options)
    }
  })
}

function createTypeNotify() {
  ;['success', 'warning', 'info', 'error'].forEach(type => {
    Message['notify'][type] = (text: string, options?: VuetifyProMessageOptions) => {
      if (typeof options !== 'object') {
        options = {}
      }

      options.type = type as MessageType
      return Message.notify(text, options)
    }
  })
}

const Message = (text: string, options?: VuetifyProMessageOptions) => {
  // 如果·options不是object则options为空
  if (typeof options !== 'object') {
    options = {}
  }

  if (options?.type === 'loading') {
    options.type = 'loading'
    options.showIcon = options.showIcon || true
    options.position = options.position || 'top'
    options.showClose = options.showClose || false
    options.timeout = options.timeout || -1
  }

  const userOnClose = options.onClose // 提取自定义onClose函数
  const id = 'message_' + seed++

  // 修改定义onClose方法
  options.onClose = function() {
    ;(Message as any).close(id, userOnClose)
  }

  // 将component主键绑定在传入的Vue上，否则$vuetify会无法获取，下面的VSnackbar也是一样
  const Constructor = Vue.extend(component)

  instance = new Constructor({
    vuetify,
    components: {
      VSnackbar: Vue.extend(VSnackbar),
      VBtn: Vue.extend(VBtn),
      VProgressCircular: Vue.extend(VProgressCircular)
      // VIcon: Vue.extend(VIcon)
    },
    propsData: {
      text: text,
      ...options
    }
  })

  // 如果有key则改为更新
  if (options.key) {
    for (let i = 0, len = instances.length; i < len; i++) {
      if (instances[i].key === options.key) {
        instances[i].text = text
        instances[i].resetTimer()
        return instances[i]
      }
    }
  }

  instance.id = id
  instance.key = options.key

  const container = document.querySelector('[data-app=true]') || document.body
  container.appendChild(instance.$mount().$el)

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += messageHeight + 16
  })
  instance.verticalOffset = verticalOffset
  instance.isActive = true
  instances.push(instance)

  return instance
}

Message.loading = (text: string, options?: VuetifyProMessageOptions) => {
  if (typeof options !== 'object') {
    options = {}
  }

  options.type = 'loading'
  options.showIcon = options.showIcon || true
  options.position = options.position || 'top'
  options.showClose = options.showClose || false
  options.timeout = options.timeout || -1

  return Message(text, options)
}

Message.notify = (text: string, options?: VuetifyProMessageOptions) => {
  if (typeof options !== 'object') {
    options = {}
  }

  options.showIcon = options.showIcon || true
  options.position = options.position || 'top-right'
  options.showClose = options.showClose || true
  options.timeout = options.timeout || 5000

  return Message(text, options)
}

Message.close = (id, userOnClose) => {
  const len = instances.length
  let index = -1
  let removedHeight
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removedHeight = messageHeight
      index = i
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      instances.splice(i, 1)
      break
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) return
  for (let i = index; i < len - 1; i++) {
    const dom = instances[i].$el
    const xTop = instances[i].top ? 'top' : 'bottom'
    dom.style[xTop] = parseInt(dom.style[xTop]) - removedHeight - 16 + 'px'
  }
}

Message.closeAll = () => {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

createTypeMessage()
createTypeNotify()

export default (v: VueConstructor, vtify) => {
  Vue = v
  vuetify = vtify
  return Message
}
