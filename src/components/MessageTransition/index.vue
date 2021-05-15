<template>
  <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" @after-leave="afterLeave" v-on="$listeners">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'MessageTransition',
  props: {
    position: {
      type: String,
      default: 'top-right'
    }
  },
  data() {
    return {
      top: (this.position || '').includes('top'),
      left: (this.position || '').includes('left'),
      right: (this.position || '').includes('right'),
      bottom: (this.position || '').includes('bottom')
    }
  },
  methods: {
    beforeEnter(el) {
      const transition = [
        'transform 0.4s ease-in-out',
        'opacity 0.3s ease-in-out',
        'left 0.3s ease-in-out',
        'right 0.3s ease-in-out',
        'top 0.4s ease-in-out',
        'bottom 0.3s ease-in-out'
      ]

      const transform = () => {
        if (this.left && this.$vuetify.rtl) return 'translateX(50%)'
        if (this.left && !this.$vuetify.rtl) return 'translateX(-50%)'
        if (this.right && this.$vuetify.rtl) return 'translateX(-50%)'
        if (this.right && !this.$vuetify.rtl) return 'translateX(50%)'
      }

      el.style.transition = transition.join(',')
      el.style.opacity = 0
      el.style.transform = transform()
    },
    enter(el) {
      setTimeout(() => {
        el.style.opacity = 1
        el.style.transform = 'translateX(0%)'
      })
    },
    leave(el) {
      el.style.opacity = 0
      if (this.top) el.style.transform = 'translateY(-50%)'
      if (this.bottom) el.style.transform = 'translateY(50%)'
    },
    afterLeave(el) {
      this.$destroy()
      el.parentNode.removeChild(el)
    }
  }
}
</script>
