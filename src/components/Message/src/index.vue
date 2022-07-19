<script lang="ts">
import { computed, defineComponent, PropType, ref, unref, watch, h } from 'vue-demi'
import { VSnackbar, VBtn, VIcon, VProgressCircular } from 'vuetify/lib'
import MessageTransition from '@/components/MessageTransition/index.vue'
import type { MessageProps } from './type'

export const defaultMessageProps = {
  app: {
    type: Boolean,
    default: true
  },
  timeout: {
    type: Number,
    default: 3000
  },
  position: {
    type: String as PropType<MessageProps['position']>,
    default: 'top-right'
  },
  multiLine: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  elevation: {
    type: [Number, String]
  },
  flat: {
    type: Boolean,
    default: false
  },
  centered: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: [Boolean, String],
    default: false
  },
  outlined: {
    type: Boolean,
    default: false
  },
  shaped: {
    type: Boolean,
    default: false
  },
  text: {
    type: [String, Function] as PropType<MessageProps['text']>,
    reqiured: true
  },
  type: {
    type: String as PropType<MessageProps['type']>,
    default: undefined
  },
  color: {
    type: String,
    default: undefined
  },
  onClose: {
    type: Function as PropType<MessageProps['onClose']>
  },
  showIcon: {
    type: Boolean,
    default: false
  },
  action: {
    type: [Function, Boolean] as PropType<MessageProps['action']>,
    default: false
  }
}

export default defineComponent({
  name: 'VuetifyProMessage',
  props: { ...defaultMessageProps },
  setup(props) {
    const isActive = ref<boolean>(false)
    const verticalOffset = ref<number>(0)
    const timer = ref<number | null>(null)

    const top = ref((props.position || '').includes('top'))
    const left = ref((props.position || '').includes('left'))
    const right = ref((props.position || '').includes('right'))
    const bottom = ref((props.position || '').includes('bottom'))

    const getColor = computed(() => {
      if (props.type === 'loading') return props.color
      return props.color || props.type
    })

    const getText = computed(() => {
      return typeof props.text === 'function' ? props.text() : props.text
    })

    const positionStyle = computed(() => ({
      [`${unref(top) ? 'top' : 'bottom'}`]: `${unref(verticalOffset)}px`
    }))

    function close() {
      isActive.value = false
    }

    function startTimer() {
      if (props.timeout > 0) {
        timer.value = setTimeout(() => close(), props.timeout)
      }
    }

    function resetTimer() {
      if (!timer.value) {
        startTimer()
        return
      }

      clearTimeout(timer.value)
      startTimer()
    }

    watch(isActive, val => {
      if (val) {
        startTimer()
      }
      if (!val && typeof props.onClose === 'function') {
        props.onClose()
      }
    })

    return {
      isActive,
      verticalOffset,
      timer,

      top,
      left,
      right,
      bottom,

      getColor,
      getText,
      positionStyle,

      close,
      startTimer,
      resetTimer
    }
  },
  render() {
    const hasIcon = this.type && this.type !== 'loading' && this.showIcon
    const hasProgress = this.type === 'loading'
    const hasAction = typeof this.action === 'function' || (typeof this.action === 'boolean' && this.action)
    const closeSnackbar = () => (this.isActive = false)

    const action = ({ attrs }: { attrs: Record<string, any> }) => {
      if (typeof this.action === 'function') return this.action({ attrs, on: { click: closeSnackbar } })

      return h(
        VBtn,
        {
          attrs: {
            right: !this.$vuetify.rtl,
            left: this.$vuetify.rtl,
            icon: true
          },
          on: {
            click: closeSnackbar
          }
        },
        [h(VIcon, '$close')]
      )
    }

    const genIcon = h(
      VIcon,
      {
        attrs: {
          size: '14',
          right: this.$vuetify.rtl,
          left: !this.$vuetify.rtl
        }
      },
      `$${this.type}`
    )

    const genProgress = h(VProgressCircular, {
      class: 'mr-1',
      attrs: {
        size: '14',
        width: '2',
        indeterminate: true,
        color: 'primary'
      }
    })

    const snackbar = h(
      VSnackbar,
      {
        directives: [{ name: 'show', value: this.isActive }],
        style: this.positionStyle,
        scopedSlots: {
          action: hasAction ? action : undefined
        },
        attrs: {
          value: true,
          app: this.app,
          timeout: -1,
          color: this.getColor,
          top: this.top,
          left: this.left,
          right: this.right,
          bottom: this.bottom,
          multiLine: this.multiLine,
          vertical: this.vertical,
          elevation: this.elevation,
          text: this.flat,
          centered: this.centered,
          rounded: this.rounded,
          outlined: this.outlined,
          shaped: this.shaped,
          transition: false
        }
      },
      [hasIcon ? genIcon : undefined, hasProgress ? genProgress : undefined, this.getText]
    )

    return h(MessageTransition, { attrs: { position: this.position } }, [snackbar])
  }
})
</script>
