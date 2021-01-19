import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'

import { ref } from '../utils/util'

export default function useLocales() {
  const lang = ref<string>('zh-CN')

  const message = ref({
    'zh-CN': {
      ...zhCN
    },
    'en-US': {
      ...enUS
    }
  })

  function setLocale(locale: string) {
    lang.value = locale
  }

  function setLocaleMessage(locale: string, msg: { [x: string]: string }) {
    message.value[locale] = msg
  }

  function i18nRender(key: string) {
    return message.value[lang.value][key] || key
  }

  return {
    lang,
    setLocale,
    setLocaleMessage,
    i18nRender
  }
}
export {
  zhCN,
  enUS
}
