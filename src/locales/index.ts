import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'

class Locale {
  public lang: string
  public message: Record<string, Record<string, string>>

  constructor() {
    this.lang = 'zh-CN'
    this.message = {
      'zh-CN': {
        ...zhCN
      },
      'en-US': {
        ...enUS
      }
    }
  }

  public set(lang: string) {
    this.lang = lang
  }

  public setMessage(lang: string, message: Record<string, string>) {
    this.message[lang] = message
  }

  public i18nRender(key: string) {
    return this.message[this.lang][key] || key
  }
}

const locale = new Locale()

export default locale
export { zhCN, enUS, Locale }
