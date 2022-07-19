<template>
  <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" @after-leave="afterLeave" v-on="$listeners">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref } from 'vue-demi'
import useContext from '@/hooks/use-context'

/**
 * 1. 改为 vue-demi 写法， JSX 修改为模板写法
 * 2. 修复 RTL 问题
 * 3. 国际化 优化
 * 4. 依赖问题优化
 */

export default defineComponent({
  name: 'MessageTransition',
  props: {
    position: {
      type: String,
      default: 'top-right'
    }
  },
  setup(props) {
    const root = useContext()

    const top = ref((props.position || '').includes('top'))
    const left = ref((props.position || '').includes('left'))
    const right = ref((props.position || '').includes('right'))
    const bottom = ref((props.position || '').includes('bottom'))

    function beforeEnter(el: HTMLElement) {
      const transition = [
        'transform 0.3s ease-in-out',
        'opacity 0.2s ease-in-out',
        'left 0.2s ease-in-out',
        'right 0.2s ease-in-out',
        'top 0.3s ease-in-out',
        'bottom 0.2s ease-in-out'
      ]

      const transform = () => {
        if (unref(left) && root?.$vuetify.rtl) return 'translateX(50%)'
        if (unref(left) && !root?.$vuetify.rtl) return 'translateX(-50%)'
        if (unref(right) && root?.$vuetify.rtl) return 'translateX(-50%)'
        if (unref(right) && !root?.$vuetify.rtl) return 'translateX(50%)'
        return ''
      }

      el.style.transition = transition.join(',')
      el.style.opacity = '0'
      el.style.transform = transform()
    }

    function enter(el: HTMLElement) {
      setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateX(0%)'
      })
    }

    function leave(el: HTMLElement) {
      el.style.opacity = '0'
      if (unref(top)) el.style.transform = 'translateY(-50%)'
      if (unref(bottom)) el.style.transform = 'translateY(50%)'
    }

    function afterLeave(el: HTMLElement) {
      root?.$destroy()
      el.parentNode?.removeChild(el)
    }

    return {
      beforeEnter,
      enter,
      leave,
      afterLeave
    }
  }
})
</script>
