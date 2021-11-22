import Vue from 'vue'
import component from './index.vue'
import { getVuetifyInstance } from '@/utils'

import type { MessageComponent, MessageOptions, MessageType } from './type'

export class MessageComp {
  private messageHeight: number = 45
  private seed: number = 1
  private instance: MessageComponent | undefined
  private instances: MessageComponent[] = []

  public open(text: string, options?: MessageOptions): MessageComponent {
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
    } else {
      if (!options.timeout) options.timeout = 5000
    }

    const userOnClose = options.onClose // 提取自定义onClose函数
    const id = 'message_' + this.seed++

    // 修改定义onClose方法
    options.onClose = () => this.close(id, userOnClose)

    // 将component主键绑定在传入的Vue上，否则$vuetify会无法获取，下面的VSnackbar也是一样
    const Constructor = Vue.extend(component)

    this.instance = new Constructor({
      vuetify: getVuetifyInstance(),
      propsData: {
        text: text,
        ...options
      }
    })

    // 如果有key则改为更新
    if (options.key) {
      for (let i = 0, len = this.instances.length; i < len; i++) {
        if (this.instances[i].key !== options.key) break

        this.instances[i].type = options.type
        this.instances[i].timeout = options.timeout
        this.instances[i].text = text
        this.instances[i].resetTimer?.()
        return this.instances[i]
      }
    }

    const container = document.querySelector('[data-app=true]') || document.body
    container.appendChild(this.instance.$mount().$el)

    const positionInstances = this.instances.filter(instance => {
      if (instance.position) return instance.position === this.instance?.position
      return false
    })

    const verticalOffset = positionInstances.length * (this.messageHeight + 16)

    this.instance.id = id
    this.instance.key = options.key
    this.instance.verticalOffset = verticalOffset
    this.instance.isActive = true
    this.instances.push(this.instance)

    return this.instance
  }

  private close(id: string, userOnClose: MessageOptions['onClose']) {
    const len = this.instances.length
    let index = -1
    let removedHeight: number = 0

    const findInstance = this.instances.find(instance => id === instance.id)

    this.instances = this.instances.filter((instance, i) => {
      if (id !== instance.id) return true
      removedHeight = this.messageHeight
      index = i
      if (typeof userOnClose === 'function') {
        userOnClose(this.instances[i])
      }
      return false
    })

    if (len <= 1 || index === -1 || index > len - 1) return
    for (let i = index; i < len - 1; i++) {
      const hasPosition = typeof this.instances[i].position === 'string'

      if (hasPosition && findInstance?.position === this.instances[i].position) {
        const dom = this.instances[i].$el
        const xTop = this.instances[i].top ? 'top' : 'bottom'
        dom.style[xTop] = parseInt(dom.style[xTop]) - removedHeight - 16 + 'px'
      }
    }
  }

  public closeAll() {
    this.instances.forEach(instance => instance.close())
  }

  private createTypeMessage(type: MessageType, text: string, options?: MessageOptions) {
    if (typeof options !== 'object') options = {}

    options.type = type
    return this.open(text, options)
  }

  private createTypeNotify(type: MessageType, text: string, options?: MessageOptions) {
    if (typeof options !== 'object') options = {}

    options.type = type
    return this.notify.open(text, options)
  }

  public success = (text: string, options?: Omit<MessageOptions, 'type'>) => this.createTypeMessage('success', text, options)
  public warning = (text: string, options?: Omit<MessageOptions, 'type'>) => this.createTypeMessage('warning', text, options)
  public info = (text: string, options?: Omit<MessageOptions, 'type'>) => this.createTypeMessage('info', text, options)
  public error = (text: string, options?: Omit<MessageOptions, 'type'>) => this.createTypeMessage('error', text, options)
  public loading = (text: string, options?: Omit<MessageOptions, 'type'>) => {
    if (typeof options !== 'object') {
      options = {}
    }

    options.showIcon = options.showIcon || true
    options.position = options.position || 'top'
    options.showClose = options.showClose || false
    options.timeout = options.timeout || -1

    return this.open(text, {
      ...options,
      type: 'loading'
    })
  }

  public notify = {
    open: (text: string, options?: MessageOptions) => {
      if (typeof options !== 'object') {
        options = {}
      }

      options.showIcon = options.showIcon || true
      options.position = options.position || 'top-right'
      options.showClose = options.showClose || true
      options.timeout = options.timeout || 5000

      return this.open(text, options)
    },
    success: (text: string, options?: Omit<MessageOptions, 'type'>) => this.createTypeNotify('success', text, options),
    warning: (text: string, options?: Omit<MessageOptions, 'type'>) => this.createTypeNotify('warning', text, options),
    info: (text: string, options?: Omit<MessageOptions, 'type'>) => this.createTypeNotify('info', text, options),
    error: (text: string, options?: Omit<MessageOptions, 'type'>) => this.createTypeNotify('error', text, options)
  }
}

export default () => {
  return new MessageComp()
}
