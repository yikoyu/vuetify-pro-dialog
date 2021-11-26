# Vuetify Pro Dialog

函数式调用Vuetify `Snackbar` 和 `Dialog` 的插件

## [查看演示](https://yikoyu.github.io/vuetify-pro-dialog/)

<p align="center">
  <a href="https://npmcharts.com/compare/vuetify-pro-dialog?minimal=true">
    <img src="http://img.shields.io/npm/dm/vuetify-pro-dialog.svg">
  </a>
  <a href="https://www.npmjs.org/package/vuetify-pro-dialog">
    <img src="https://img.shields.io/npm/v/vuetify-pro-dialog.svg">
  </a>
  <a href="http://img.badgesize.io/https://unpkg.com/vuetify-pro-dialog/lib/vuetify-pro-dialog.es.js?compression=gzip&label=gzip">
    <img src="http://img.badgesize.io/https://unpkg.com/vuetify-pro-dialog/lib/vuetify-pro-dialog.es.js?compression=gzip&label=gzip">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>

## 安装
#### 安装依赖
- [![Vue-Badge][Vue-Badge]][Vue-Link]
- [![Vuetify-Badge][Vuetify-Badge]][Vuetify-Link]

```shell
# npm
npm i vuetify-pro-dialog -S
# yarn
yarn add vuetify-pro-dialog
# pnpm
pnpm add vuetify-pro-dialog
```

## 配置
```typescript
import VuetifyProDialog, { InstallationOptions } from 'vuetify-pro-dialog'

// 额外配置，可选，text也可使用国际化函数
const actions: Omit<InstallationOptions, 'vuetify'> = {
  false: {},
  true: {},
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
  alert: {},
  prompt: {}
}

App.use(VuetifyProDialog, {
  vuetify,
  ...actions
})
```

## i18n国际化
```typescript
import { locale } from 'vuetify-pro-dialog'

locale.setMessage('en', {
  'dialog.cancel.text': 'cancel',
  'dialog.ok.text': 'ok'
})

locale.set('en_US')
```

> 国际化默认zh_CN和en_US两种，如需添加请属使用`locale.setMessage`函数

## RTL
```typescript
this.$vuetify.rtl = true
this.$dialog.setRTL(true) // 设置RTL必须调用setRTL函数，不然会还原
```

## 使用

### Message
```typescript
this.$dialog.message('这是一段信息')
this.$dialog.message.info('这是一段信息')
this.$dialog.message.success('这是一段信息')
this.$dialog.message.warning('这是一段信息')
this.$dialog.message.error('这是一段信息')

// 或使用
import { Message } from 'vuetify-pro-dialog'

Message.open('这是一段信息')
Message.info('这是一段信息')
Message.success('这是一段信息')
Message.warning('这是一段信息')
Message.error('这是一段信息')
```

更新message
```typescript
this.$dialog.message('这是一段信息', { key: 'test' })
this.$dialog.message('这是第二段信息', { key: 'test' })
```

### Notify
```typescript
this.$dialog.notify('这是一段信息')
this.$dialog.notify.info('这是一段信息')
this.$dialog.notify.success('这是一段信息')
this.$dialog.notify.warning('这是一段信息')
this.$dialog.notify.error('这是一段信息')

// 或使用
import { Message } from 'vuetify-pro-dialog'

Message.notify.open('这是一段信息')
Message.notify.info('这是一段信息')
Message.notify.success('这是一段信息')
Message.notify.warning('这是一段信息')
Message.notify.error('这是一段信息')
```

### Loading
```typescript
const loading = this.$dialog.loading('加载中...')
setTimeout(() => { loading.close() }, 5000)

// 或使用
import { Message } from 'vuetify-pro-dialog'
const loading = Message.loading('加载中...')
setTimeout(() => { loading.close() }, 5000)
```

### Comfirm
```typescript
const res = await this.$dialog.comfirm('是否确认删除？')

// 或使用
import { MessageBox } from 'vuetify-pro-dialog'
const res = await MessageBox.comfirm('是否确认删除？')
```

### Alert
```typescript
const res = await this.$dialog.alert('是否确认删除？')

// 或使用
import { MessageBox } from 'vuetify-pro-dialog'
const res = await MessageBox.alert('是否确认删除？')
```

### Prompt
```typescript
const res = await this.$dialog.prompt('密码', {
  rules: [(v: string) => !!v || '请输入密码'],
  textFieldProps: { type: 'possword' },
  beforeClose: (text: string) => {
    // 异步操作放此处,必须返回promise, 返回true表示继续， false表示暂停错误
    return new Promise(resolve => {
      setTimeout(() => resolve(true), 2000)
    })
  }
})

// 或使用
import { MessageBox } from 'vuetify-pro-dialog'
const res = await MessageBox.prompt('密码', {
  rules: [(v: string) => !!v || '请输入密码'],
  textFieldProps: { type: 'possword' },
  beforeClose: (text: string) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(true), 2000)
    })
  }
})
```

### CloseAll
```typescript
this.$dialog.message.closeAll() // 关闭所有message
this.$dialog.msgbox.closeAll() // 关闭所有messagebox

// 或使用
import { Message, MessageBox } from 'vuetify-pro-dialog'
Message.closeAll()
MessageBox.closeAll()
```

[Vue-Badge]: https://img.shields.io/badge/-Vue_>=_2.6.14-4FC08D?logo=vue.js&logoColor=white "Vue"
[Vue-Link]: https://cn.vuejs.org/ "Vue-Link"
[Vuetify-Badge]: https://img.shields.io/badge/-Vuetify_%3E=_2.6.0-1867C0?logo=vuetify&logoColor=white "Vuetify"
[Vuetify-Link]: https://vuetifyjs.com/zh-Hans/ "Vuetify-Link"