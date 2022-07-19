<template>
  <v-dialog v-model="isActive" width="100%" :max-width="width" :persistent="persistent" :scrollable="scrollable" @click:outside="dialogOutside">
    <v-card dense tile>
      <v-toolbar v-if="Boolean(getTitle)" :dark="Boolean(getColor)" :color="getColor" dense flat>
        <v-icon v-if="Boolean(getIcon) && showIcon" v-bind="[{ [`${$vuetify.rtl ? 'right' : 'left'}`]: true }]">{{ getIcon }}</v-icon>
        <v-toolbar-title class="">{{ getTitle }}</v-toolbar-title>

        <v-spacer />

        <v-btn v-bind="[{ [`${$vuetify.rtl ? 'left' : 'right'}`]: true }]" v-if="showClose" icon @click="dialogClose">
          <v-icon>$close</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
      <v-card-text v-if="['alert', 'confirm'].includes($type)" class="body-1 py-2" :class="[{ 'pt-4': !getTitle }, contentClass]" v-html="getText" />
      <v-card-text v-if="['prompt'].includes($type)" class="body-1 py-2" :class="[{ 'pt-4': !getTitle }, contentClass]">
        <v-text-field ref="prompt" v-model="textValue" :rules="rules" :label="getText" v-bind="textFieldProps" />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text :color="actions && actions.false ? actions.false.color : undefined" @click="cancel" v-if="!['alert'].includes($type)">
          {{ cancelText }}
        </v-btn>
        <v-btn text :color="actions && actions.true ? actions.true.color : undefined" :loading="promptDisabled" @click="confirm">{{ confirmText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref, watch } from 'vue-demi'
import type { PropType } from 'vue-demi'
import useContext from '@/hooks/use-context'
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

export default defineComponent({
  name: 'VuetifyProMessageBox',
  props: { ...defaultMessageBoxProps },
  setup(props) {
    const prompt = ref<Record<string, any> | null>(null)
    const root = useContext()

    const isActive = ref<boolean>(false)
    const disabled = ref<boolean>(false)
    const textValue = ref<string>('')

    const getIcon = computed(() => {
      if (props.icon === false) return
      return props.icon || root?.$vuetify?.icons?.values[props.type] || props.type
    })

    const getColor = computed(() => {
      return props.color || props.type
    })

    const getText = computed(() => {
      return typeof props.text === 'function' ? props.text() : props.text
    })

    const getTitle = computed(() => {
      return typeof props.title === 'function' ? props.title() : props.title
    })

    const confirmText = computed(() => {
      return typeof props.actions?.true?.text === 'function'
        ? props.actions.true.text()
        : typeof props.actions?.true?.text === 'string'
        ? props.actions.true.text
        : ''
    })

    const cancelText = computed(() => {
      return typeof props.actions?.false?.text === 'function'
        ? props.actions.false.text()
        : typeof props.actions?.false?.text === 'string'
        ? props.actions.false.text
        : ''
    })

    const promptDisabled = computed(() => {
      return ['confirm', 'prompt'].includes(props.$type) && unref(disabled)
    })

    function handleAction(key: 'cancel' | 'confirm') {}

    /** dialog外部点击 */
    function dialogOutside() {
      const t = !['alert'].includes(props.$type) ? 'cancel' : 'confirm'
      !props.persistent && !unref(disabled) && handleAction(t)
    }

    /** 点击关闭按钮 */
    function dialogClose() {
      const t = !['alert'].includes(props.$type) ? 'cancel' : 'confirm'
      !unref(disabled) && handleAction(t)
    }

    /** 点击确认按钮 */
    async function confirm() {
      if (unref(disabled)) return

      if (props.$type === 'prompt') {
        const bool = await unref(prompt)?.validate(true)
        if (!bool) return
      }

      disabled.value = true

      if (typeof props.beforeClose === 'function') {
        const bool = await props.beforeClose(unref(textValue) || '')
        if (!bool) {
          disabled.value = false
          return
        }
      }

      handleAction('confirm')
    }

    /** 点击取消按钮 */
    function cancel() {
      !unref(disabled) && handleAction('cancel')
    }

    /** 销毁弹出层 */
    function _destroy() {
      if (!root) return

      setTimeout(() => {
        root.$destroy()
        root.$el.parentNode?.removeChild(root.$el)
      }, 500)
    }

    watch(isActive, val => {
      if (!val) _destroy()
    })

    return {
      isActive,
      disabled,
      textValue,

      getIcon,
      getColor,
      getText,
      getTitle,
      confirmText,
      cancelText,
      promptDisabled,

      dialogOutside,
      dialogClose,
      confirm,
      cancel
    }
  }
})
</script>
