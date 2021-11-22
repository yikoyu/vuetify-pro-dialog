<template>
  <message-transition :position="position">
    <v-snackbar
      :value="true"
      v-show="isActive"
      :timeout="-1"
      :color="getColor"
      :top="top"
      :left="left"
      :right="right"
      :bottom="bottom"
      :multi-line="multiLine"
      :vertical="vertical"
      :elevation="elevation"
      :text="flat"
      :centered="centered"
      :rounded="rounded"
      :outlined="outlined"
      :shaped="shaped"
      :transition="false"
      :style="positionStyle"
    >
      <v-icon v-if="type && type !== 'loading' && showIcon" size="14" v-bind="[{ [`${$vuetify.rtl ? 'right' : 'left'}`]: true }]">{{ '$' + type }}</v-icon>
      <v-progress-circular v-if="type === 'loading'" size="14" width="2" indeterminate color="primary" class="mr-1"></v-progress-circular>
      {{ getText }}

      <template v-if="showClose" v-slot:action="{ attrs }">
        <v-btn v-bind="[{ [`${$vuetify.rtl ? 'left' : 'right'}`]: true }, attrs]" icon @click="isActive = false">
          <v-icon>$close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </message-transition>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import MessageTransition from '@/components/MessageTransition/index.vue'
import { MessageProps } from './type'

export const defaultMessageProps = {
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
  showClose: {
    type: Boolean,
    default: false
  },
  showIcon: {
    type: Boolean,
    default: false
  }
}

export default Vue.extend({
  name: 'VuetifyProMessage',
  components: { MessageTransition },
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
    getText(): string | undefined {
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
  }
})
</script>
