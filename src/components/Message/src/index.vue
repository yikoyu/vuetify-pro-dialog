<template>
  <transition name="pro-message-fade" @after-leave="handleAfterLeave">
    <v-snackbar
      :value="true"
      v-show="isActive"
      :color="getColor"
      :class="['pro-message', top && 'top', left && ($vuetify.rtl ? 'right' : 'left'), right && ($vuetify.rtl ? 'left' : 'right'), bottom && bottom]"
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
      <v-icon v-if="type && showIcon" v-bind="[{ [`${$vuetify.rtl ? 'right' : 'left'}`]: true }]">{{ '$' + type }}</v-icon>
      {{ text }}

      <template v-if="showClose" v-slot:action="{ attrs }">
        <v-btn v-bind="[{ [`${$vuetify.rtl ? 'left' : 'right'}`]: true }, attrs]" icon @click="isActive = false">
          <v-icon>$close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </transition>
</template>

<script>
export default {
  name: 'VuetifyProMessage',
  props: {
    timeout: {
      type: Number,
      default: 3000
    },
    position: {
      type: String,
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
      type: [String, Function],
      reqiured: true
    },
    type: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: undefined
    },
    onClose: {
      type: Function
    },
    showClose: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isActive: false,
      verticalOffset: 0,
      timer: null,

      top: (this.position || '').includes('top'),
      left: (this.position || '').includes('left'),
      right: (this.position || '').includes('right'),
      bottom: (this.position || '').includes('bottom')
    }
  },
  computed: {
    getColor() {
      return this.color || this.type
    },
    positionStyle() {
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
    handleAfterLeave() {
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    },

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
      if (this.timer) {
        clearTimeout(this.timer)
        this.startTimer()
      }
    }
  }
}
</script>

<style lang="scss">
.pro-message {
  transition: opacity 0.3s, transform 0.4s, left 0.3s, right 0.3s, top 0.4s, bottom 0.3s;
}

.pro-message-fade {
  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter {
    &[class~='right'] {
      transform: translateX(50%);
    }
    &[class~='left'] {
      transform: translateX(-50%);
    }
  }

  &-leave-to {
    &[class~='top'] {
      transform: translateY(-50%);
    }
    &[class~='bottom'] {
      transform: translateY(50%);
    }
  }
}
</style>
