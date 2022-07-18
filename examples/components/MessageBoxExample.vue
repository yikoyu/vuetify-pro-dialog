<template>
  <example-area title="MessageBox" class="mb-12" max-width="600px" content-height="300px">
    <v-btn @click="show" color="primary">显示</v-btn>
    <v-btn class="ml-2" @click="closeAll">关闭全部</v-btn>

    <template #config>
      <v-select v-model="options.boxType" label="类型" :items="boxTypes" hide-details></v-select>
      <v-select v-model="options.type" label="色彩类型" :items="types" hide-details></v-select>
      <v-checkbox v-model="options.isAsync" label="异步" hide-details></v-checkbox>
    </template>
  </example-area>
</template>

<script lang="ts">
import { defineComponent, ref, unref, PropType, reactive } from '@vue/composition-api'
import { MessageBox, MessageBoxOptions } from 'vuetify-pro-dialog'
import ExampleArea from './ExampleArea.vue'

interface Options {
  boxType: 'alert' | 'confirm' | 'prompt'
  type: MessageBoxOptions['type']
  isAsync: boolean
}

export default defineComponent({
  components: { ExampleArea },
  props: {
    types: {
      type: Array as PropType<Options['type'][]>,
      default: () => []
    }
  },
  setup() {
    const boxTypes = ref<Options['boxType'][]>(['alert', 'confirm', 'prompt'])

    const options = reactive<Options>({
      boxType: 'alert',
      type: 'info',
      isAsync: false
    })
    const n = ref(1)

    function show() {
      MessageBox[options.boxType](`这是 ${unref(n)} 段信息。`, {
        type: options.type,
        rules: [val => !!val || 'Required.'],
        beforeClose: options.isAsync
          ? text => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(true)
                }, 1500)
              })
            }
          : undefined
      })

      n.value++
    }

    function closeAll() {
      MessageBox.closeAll()
    }

    return {
      boxTypes,
      options,
      show,
      closeAll
    }
  }
})
</script>
