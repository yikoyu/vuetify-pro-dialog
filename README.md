<h1 align="center">Vuetify Pro Dialog</h1>

## 安装
```shell
# yarn
yarn add vuetify-pro-dialog
# npm
npm i vuetify-pro-dialog -S
```

```typescript
import VuetifyProDialog from 'vuetify-pro-dialog'
import 'vuetify-pro-dialog/dist/vuetify-pro-dialog.min.css'

// 额外配置，可选，text也可使用国际化函数
const actions = {
  confirm: {
    actions: {
      false: {
        text: () => i18nRender('dialog.actions.cancel')
      },
      true: {
        text: () => i18nRender('dialog.actions.ok'),
        color: 'primary'
      }
    }
  },
  alert: {
    true: {
      text: () => i18nRender('dialog.actions.ok'),
      color: 'primary'
    }
  }
}

App.use(VuetifyProDialog, {
  vuetify,
  ...actions
})
```

```typescript
// 必须手动注册此3个组件
import Vuetify, { VDialog, VTextField, VIcon } from 'vuetify'

Vue.use(Vuetify, {
  components: {
    VDialog,
    VTextField,
    VIcon
  }
})
```

## i18n国际化
```typescript
import { setLocale, setLocaleMessage } from 'vuetify-pro-dialog'

setLocaleMessage('en', {
  'dialog.cancel.text': 'cancel',
  'dialog.ok.text': 'ok'
})

setLocale('en_US')
```
PS: 国际化默认zh_CN和en_US两种，如需添加请属使用setLocaleMessage函数

## 使用

### Message
```typescript
this.$dialog.message('这是一段信息')
this.$dialog.message.info('这是一段信息')
this.$dialog.message.success('这是一段信息')
this.$dialog.message.warning('这是一段信息')
this.$dialog.message.error('这是一段信息')
```
或使用
```typescript
import { Message } from 'vuetify-pro-dialog'

Message('这是一段信息')
Message.info('这是一段信息')
Message.success('这是一段信息')
Message.warning('这是一段信息')
Message.error('这是一段信息')
```

### 更新message内容
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
```
或使用
```typescript
import { Message } from 'vuetify-pro-dialog'

Message.notify('这是一段信息')
Message.notify.info('这是一段信息')
Message.notify.success('这是一段信息')
Message.notify.warning('这是一段信息')
Message.notify.error('这是一段信息')
```

### Loading
```typescript
const loading = this.$dialog.loading('加载中...')

setTimeout(() => { loading.close() }, 5000)
```
或使用
```typescript
import { Message } from 'vuetify-pro-dialog'

const loading = Message.notify('加载中...')

setTimeout(() => { loading.close() }, 5000)
```

### Comfirm
```typescript
const res = await this.$dialog.comfirm('是否确认删除？', '提示')
```
或使用
```typescript
import { MessageBox } from 'vuetify-pro-dialog'

const res = await MessageBox.comfirm('是否确认删除？', '提示')
```

### Alert
```typescript
const res = await this.$dialog.alert('是否确认删除？', '提示')
```
或使用
```typescript
import { MessageBox } from 'vuetify-pro-dialog'

const res = await MessageBox.alert('是否确认删除？', '提示')
```

### Prompt
```typescript
const res = await this.$dialog.prompt('密码', '提示', {
  rules: [(v: string) => !!v || '请输入密码'],
  textField: { type: 'possword' },
  beforeClose: (text: string) => {
    // 异步操作放此处,必须返回promise, 返回true表示继续， false表示暂停错误
    return new Promise(resolve => {
      setTimeout(() => resolve(true), 2000)
    })
  }
})
```
或使用
```typescript
import { MessageBox } from 'vuetify-pro-dialog'

const res = await MessageBox.prompt('密码', '提示', {
  rules: [(v: string) => !!v || '请输入密码'],
  textField: { type: 'possword' },
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
```
或使用
```typescript
import { Message, MessageBox } from 'vuetify-pro-dialog'

Message.closeAll()
MessageBox.closeAll()
```