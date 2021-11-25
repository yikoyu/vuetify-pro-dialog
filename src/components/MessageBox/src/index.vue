<template>
  <v-dialog v-model="isActive" :max-width="width" :persistent="persistent" :scrollable="scrollable" @click:outside="dialogOutside">
    <v-card dense tile>
      <v-toolbar v-if="Boolean(getTitle)" :dark="Boolean(getColor)" :color="getColor" dense flat>
        <v-icon v-if="Boolean(getIcon) && showIcon" v-bind="[{ [`${$vuetify.rtl ? 'right' : 'left'}`]: true }]">{{ getIcon }}</v-icon>
        <v-toolbar-title class="">{{ getTitle }}</v-toolbar-title>

        <v-spacer />

        <v-btn v-bind="[{ [`${$vuetify.rtl ? 'left' : 'right'}`]: true }]" v-if="showClose" icon @click="dialogClose">
          <v-icon>$close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text v-if="['alert', 'confirm'].includes($type)" class="body-1 py-2" :class="[{ 'pt-4': !getTitle }, contentClass]" v-html="getText" />
      <v-card-text v-if="['prompt'].includes($type)" class="body-1 py-2" :class="[{ 'pt-4': !getTitle }, contentClass]">
        <v-text-field ref="prompt" v-model="textValue" :rules="rules" :label="getText" v-bind="textFieldProps" />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text :color="actions.false ? actions.false.color : undefined" @click="cancel" v-if="!['alert'].includes($type)">{{ cancelText }}</v-btn>
        <v-btn text :color="actions.true ? actions.true.color : undefined" :loading="promptDisabled" @click="confirm">{{ confirmText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import locale from '@/locales'
import type { MessageBoxProps } from './type'

export const defaultMessageBoxProps = {
  $type: {
    type: String as PropType<MessageBoxProps['$type']>,
    default: undefined
  },
  type: {
    type: String as PropType<MessageBoxProps['type']>,
    default: undefined
  },
  width: {
    type: Number,
    default: 450
  },
  persistent: {
    type: Boolean,
    default: false
  },
  scrollable: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: undefined
  },
  text: {
    type: [String, Function] as PropType<MessageBoxProps['text']>,
    required: true
  },
  title: {
    type: [String, Function] as PropType<MessageBoxProps['text']>,
    default: () => locale.i18nRender('dialog.warn')
  },
  contentClass: {
    type: String,
    default: ''
  },
  actions: {
    type: Object as PropType<MessageBoxProps['actions']>
  },
  icon: {
    type: [String, Boolean] as PropType<MessageBoxProps['icon']>,
    default: undefined
  },
  showClose: {
    type: Boolean,
    default: false
  },
  showIcon: {
    type: Boolean,
    default: true
  },
  rules: {
    type: Array as PropType<MessageBoxProps['rules']>,
    default: () => []
  },
  beforeClose: {
    type: Function as PropType<MessageBoxProps['beforeClose']>
  },
  textFieldProps: {
    type: Object as PropType<MessageBoxProps['textFieldProps']>,
    default: () => ({})
  }
}

export default Vue.extend({
  name: 'VuetifyProMessageBox',
  props: { ...defaultMessageBoxProps },
  data() {
    return {
      isActive: false,
      disabled: false,
      textValue: ''
    }
  },
  watch: {
    isActive(val) {
      if (!val) this._destroy()
    }
  },
  computed: {
    getIcon(): unknown {
      if (this.icon === false) return
      return this.icon || (this.$vuetify && this.$vuetify.icons && this.$vuetify.icons.values[this.type]) || this.type
    },
    getColor(): string {
      return this.color || this.type
    },
    getText(): string {
      return typeof this.text === 'function' ? this.text() : this.text
    },
    getTitle(): string {
      return typeof this.title === 'function' ? this.title() : this.title
    },
    confirmText(): string {
      return typeof this.actions.true?.text === 'function'
        ? this.actions.true.text()
        : typeof this.actions.true?.text === 'string'
        ? this.actions.true.text
        : ''
    },
    cancelText(): string {
      return typeof this.actions.false?.text === 'function'
        ? this.actions.false.text()
        : typeof this.actions.false?.text === 'string'
        ? this.actions.false.text
        : ''
    },
    promptDisabled(): boolean {
      return ['confirm', 'prompt'].includes(this.$type) && this.disabled
    }
  },
  methods: {
    handleAction(key: 'cancel' | 'confirm') {},

    /** dialog外部点击 */
    dialogOutside() {
      const t = !['alert'].includes(this.$type) ? 'cancel' : 'confirm'
      !this.persistent && !this.disabled && this.handleAction(t)
    },

    /** 点击关闭按钮 */
    dialogClose() {
      const t = !['alert'].includes(this.$type) ? 'cancel' : 'confirm'
      !this.disabled && this.handleAction(t)
    },

    /** 点击确认按钮 */
    async confirm() {
      if (this.disabled) return

      if (this.$type === 'prompt') {
        const bool = await (this.$refs.prompt as any).validate(true)
        if (!bool) return
      }

      this.disabled = true

      if (typeof this.beforeClose === 'function') {
        const bool = await this.beforeClose(this.textValue || '')
        if (!bool) {
          this.disabled = false
          return
        }
      }

      this.handleAction('confirm')
    },

    /** 点击取消按钮 */
    cancel() {
      !this.disabled && this.handleAction('cancel')
    },

    /** 销毁弹出层 */
    _destroy() {
      setTimeout(() => {
        this.$destroy()
        this.$el.parentNode?.removeChild(this.$el)
      }, 500)
    }
  }
})
</script>
