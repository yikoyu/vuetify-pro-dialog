<template>
  <v-dialog v-model="isActive" :max-width="width" :persistent="persistent" :scrollable="scrollable" @click:outside="dialogOutside">
    <v-card dense tile>
      <v-toolbar v-if="getTitle" :dark="Boolean(getColor)" :color="getColor" dense flat>
        <v-icon v-if="Boolean(getIcon) && showIcon" v-bind="[{ [`${$vuetify.rtl ? 'right' : 'left'}`]: true }]">{{ getIcon }}</v-icon>
        <v-toolbar-title class="">{{ getTitle }}</v-toolbar-title>

        <v-spacer />

        <v-btn v-bind="[{ [`${$vuetify.rtl ? 'left' : 'right'}`]: true }]" v-if="showClose" icon @click="dialogClose">
          <v-icon>$close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text v-if="['alert', 'confirm'].includes($type)" class="body-1 py-2" :class="{ 'pt-4': !getTitle }" v-html="getText" />
      <v-card-text v-if="['prompt'].includes($type)" class="body-1 py-2" :class="{ 'pt-4': !getTitle }">
        <v-text-field ref="prompt" v-model="textValue" :rules="rules" :label="getText" v-bind="textField" />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text :color="actions.false.color" @click="cancel" v-if="!['alert'].includes($type)">{{ cancelText }}</v-btn>
        <v-btn text :color="actions.true.color" :loading="promptDisabled" @click="confirm">{{ confirmText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'VuetifyProMessageBox',
  props: {
    $type: {
      type: String,
      default: undefined
    },
    type: {
      type: String,
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
      type: [String, Function],
      reqiured: true
    },
    title: {
      type: [String, Function],
    },
    actions: {
      type: Object
    },
    icon: {
      type: [String, Boolean],
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
      type: Array,
      default: () => []
    },
    beforeClose: {
      type: Function
    },
    textField: {
      type: Object,
      default: () => {}
    }
  },
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
    getIcon() {
      if (this.icon === false) {
        return
      }
      return this.icon || (this.$vuetify && this.$vuetify.icons && this.$vuetify.icons.values[this.type]) || this.type
    },
    getColor() {
      return this.color || this.type
    },
    getText() {
      return typeof this.text === 'function' ? this.text() : this.text
    },
    getTitle() {
      return typeof this.title === 'function' ? this.title() : this.title
    },
    confirmText() {
      return typeof this.actions.true.text === 'function' ? this.actions.true.text() : this.actions.true.text
    },
    cancelText() {
      return typeof this.actions.false.text === 'function' ? this.actions.false.text() : this.actions.false.text
    },
    promptDisabled() {
      return ['prompt'].includes(this.$type) && this.disabled
    }
  },
  methods: {
    handleAction(key) {},

    /** dialog外部点击 */
    dialogOutside() {
      const t = !['alert'].includes(this.$type) ? 'cancel' : 'confirm'
      !this.persistent && !this.disabled && this.handleAction(t)
    },

    /**点击关闭按钮 */
    dialogClose() {
      const t = !['alert'].includes(this.$type) ? 'cancel' : 'confirm'
      !this.disabled && this.handleAction(t)
    },

    /**点击确认按钮 */
    async confirm() {
      if (this.disabled) return

      if (this.$type === 'prompt') {
        const bool = await this.$refs.prompt.validate(true)
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

    /**点击取消按钮 */
    cancel() {
      !this.disabled && this.handleAction('cancel')
    },

    /** 销毁弹出层 */
    _destroy() {
      setTimeout(() => {
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      }, 500)
    }
  }
}
</script>
