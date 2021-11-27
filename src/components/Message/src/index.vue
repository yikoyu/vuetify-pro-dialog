<script lang="tsx">
import Vue, { PropType, VNodeChildren, VNode } from 'vue'
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

export default Vue.extend({
  name: 'VuetifyProMessage',
  props: { ...defaultMessageProps },
  data() {
    return {
      isActive: false,
      verticalOffset: 0,
      timer: null as NodeJS.Timeout | null,

      top: (this.position || '').includes('top'),
      left: (this.position || '').includes('left'),
      right: (this.position || '').includes('right'),
      bottom: (this.position || '').includes('bottom')
    }
  },
  computed: {
    getColor(): string {
      if (this.type === 'loading') return this.color
      return this.color || this.type
    },
    getText(): string | VNode | VNodeChildren | undefined {
      return typeof this.text === 'function' ? this.text() : this.text
    },
    positionStyle(): Record<string, string> {
      return {
        [`${this.top ? 'top' : 'bottom'}`]: `${this.verticalOffset}px`
      }
    }
  },
  watch: {
    isActive(val) {
      if (val) {
        this.startTimer()
      }
      if (!val && typeof this.onClose === 'function') {
        this.onClose()
      }
    }
  },
  methods: {
    close() {
      this.isActive = false
    },

    startTimer() {
      if (this.timeout > 0) {
        this.timer = setTimeout(() => {
          this.close()
        }, this.timeout)
      }
    },

    resetTimer() {
      if (!this.timer) {
        this.startTimer()
        return
      }

      clearTimeout(this.timer)
      this.startTimer()
    }
  },
  render() {
    const hasIcon = this.type && this.type !== 'loading' && this.showIcon
    const hasProgress = this.type === 'loading'
    const hasAction = typeof this.action === 'function' || (typeof this.action === 'boolean' && this.action)
    const closeSnackbar = () => (this.isActive = false)

    const action = ({ attrs }: { attrs: Record<string, any> }) => {
      if (typeof this.action === 'function') return this.action({ attrs, on: { click: closeSnackbar } })

      return (
        <VBtn right={!this.$vuetify.rtl} left={this.$vuetify.rtl} icon on-click={closeSnackbar}>
          <VIcon>$close</VIcon>
        </VBtn>
      )
    }

    const genIcon = (
      <VIcon size="14" right={this.$vuetify.rtl} left={!this.$vuetify.rtl}>
        {`$${this.type}`}
      </VIcon>
    )

    const genProgress = <VProgressCircular size="14" width="2" indeterminate color="primary" class="mr-1"></VProgressCircular>

    return (
      <MessageTransition position={this.position}>
        <VSnackbar
          value={true}
          {...{ directives: [{ name: 'show', value: this.isActive }] }}
          app={this.app}
          timeout={-1}
          color={this.getColor}
          top={this.top}
          left={this.left}
          right={this.right}
          bottom={this.bottom}
          multi-line={this.multiLine}
          vertical={this.vertical}
          elevation={this.elevation}
          text={this.flat}
          centered={this.centered}
          rounded={this.rounded}
          outlined={this.outlined}
          shaped={this.shaped}
          transition={false}
          style={this.positionStyle}
          scopedSlots={{
            action: hasAction ? action : undefined
          }}
        >
          {hasIcon && genIcon}
          {hasProgress && genProgress}
          {this.getText}
        </VSnackbar>
      </MessageTransition>
    )
  }
})
</script>
