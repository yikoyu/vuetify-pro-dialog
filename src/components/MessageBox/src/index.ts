import Vue from 'vue'
import component from './index.vue'
import { getVuetifyInstance, merge } from '@/utils'

import type { MessageBoxComponent, MessageBoxProps, MessageBoxOptions, InstallationMessageOptions } from './type'

type Settings = Pick<InstallationMessageOptions, 'alert' | 'confirm' | 'prompt'>

type OTextOpt = Partial<Omit<MessageBoxOptions, 'text'>>
type OTitleTextOpt = Partial<Omit<MessageBoxOptions, 'text' | 'title'>>

export class MessageBoxComp {
  private settings: Settings
  private seed: number = 1
  private instance?: MessageBoxComponent
  private instances: MessageBoxComponent[] = []

  constructor(settings: Settings) {
    this.settings = settings
  }

  private open(options: Partial<MessageBoxProps>): Promise<boolean> {
    if (typeof options !== 'object') {
      options = {}
    }

    const Constructor = Vue.extend(component)

    this.instance = new Constructor({
      vuetify: getVuetifyInstance(),
      propsData: {
        ...options
      }
    })

    const container = document.querySelector('[data-app=true]') || document.body
    container.appendChild(this.instance.$mount().$el)

    const id = 'messagebox_' + this.seed++
    this.instance.id = id
    this.instance.isActive = true
    this.instances.push(this.instance)

    return new Promise<boolean>((resolve, reject) => {
      const item = this.instances.find(k => k.id === this.instance?.id)

      if (item) {
        item.handleAction = async (key: 'confirm' | 'cancel') => {
          if (['confirm', 'cancel'].includes(key)) {
            item.isActive = false
            item.disabled = false
            this.instances = this.instances.filter(k => k.id !== this.instance?.id)
            resolve(key === 'confirm')
          } else {
            item.disabled = false
            reject(new Error('key is error'))
          }
        }
      } else {
        reject(new Error('no instances'))
      }
    })
  }

  private createMessageBox(type: MessageBoxProps['$type'], text: string, title?: string | OTextOpt, options?: OTitleTextOpt): Promise<boolean> {
    let config: Partial<MessageBoxProps> = options || {}

    if (typeof config !== 'object') {
      config = {}
    }

    if (typeof title === 'object') {
      config = title
    }

    return this.open({
      ...config,
      actions: merge({}, this.settings[type], config.actions),
      width: config?.width || this.settings?.[type]?.width,
      title: typeof config.title === 'function' ? config.title() : config.title,
      text,
      $type: type
    })
  }

  public alert(text: string, title?: OTextOpt): Promise<boolean>
  public alert(text: string, title?: string, options?: OTitleTextOpt): Promise<boolean>
  public alert(text: string, title?: string | OTextOpt, options?: OTitleTextOpt): Promise<boolean> {
    return this.createMessageBox('alert', text, title, options)
  }

  public confirm(text: string, title?: OTextOpt): Promise<boolean>
  public confirm(text: string, title?: string, options?: OTitleTextOpt): Promise<boolean>
  public confirm(text: string, title?: string | OTextOpt, options?: OTitleTextOpt): Promise<boolean> {
    return this.createMessageBox('confirm', text, title, options)
  }

  public prompt(text: string, title?: OTextOpt): Promise<boolean>
  public prompt(text: string, title?: string, options?: OTitleTextOpt): Promise<boolean>
  public prompt(text: string, title?: string | OTextOpt, options?: OTitleTextOpt): Promise<boolean> {
    return this.createMessageBox('prompt', text, title, options)
  }

  public closeAll() {
    if (!this.instances.length) return
    this.instances.forEach(item => (item.isActive = false))
    this.instances = []
  }
}

export default (settings: InstallationMessageOptions) => {
  const options: Settings = {
    alert: {
      true: {
        text: settings.alert?.true?.text || settings.true?.text,
        color: settings.alert?.true?.color || settings.true?.color
      },
      width: settings.alert?.width
    },
    confirm: {
      true: {
        text: settings.confirm?.true?.text || settings.true?.text,
        color: settings.confirm?.true?.color || settings.true?.color
      },
      false: {
        text: settings.confirm?.false?.text || settings.false?.text,
        color: settings.confirm?.false?.color || settings.false?.color
      },
      width: settings.confirm?.width
    },
    prompt: {
      true: {
        text: settings.prompt?.true?.text || settings.true?.text,
        color: settings.prompt?.true?.color || settings.true?.color
      },
      false: {
        text: settings.prompt?.false?.text || settings.false?.text,
        color: settings.prompt?.false?.color || settings.false?.color
      },
      width: settings.prompt?.width
    }
  }

  return new MessageBoxComp(options || {})
}
