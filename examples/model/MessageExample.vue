<template>
  <example-area title="Message" class="mb-12" max-width="600px" content-height="300px">
    <v-btn @click="show" color="primary">显示</v-btn>
    <v-btn class="ml-2" @click="closeAll">关闭全部</v-btn>

    <template #config>
      <v-select v-model="options.type" label="类型" :items="types" hide-details></v-select>
      <v-select v-model="options.position" label="位置" :items="positions" hide-details></v-select>
      <v-checkbox v-model="options.isUpdate" label="更新" hide-details></v-checkbox>
      <v-checkbox v-model="options.isLoading" label="loading" hide-details></v-checkbox>
      <v-checkbox v-model="options.app" label="App" hide-details></v-checkbox>
      <v-slider v-model="options.timeout" label="时间" :min="-1" :max="10000" thumb-label="always"></v-slider>
    </template>
  </example-area>
</template>

<script lang="ts">
import { defineComponent, ref, unref, PropType, reactive } from '@vue/composition-api'
import { Message, MessageOptions } from 'vuetify-pro-dialog'
import ExampleArea from '../components/ExampleArea.vue'

interface Options {
  type: MessageOptions['type'] | 'open'
  position: MessageOptions['position']
  timeout: number
  isUpdate: boolean
  isLoading: boolean
  app: boolean
}

export default defineComponent({
  components: { ExampleArea },
  props: {
    types: {
      type: Array as PropType<(MessageOptions['type'] | 'open')[]>,
      default: () => []
    },
    positions: {
      type: Array as PropType<MessageOptions['position'][]>,
      default: () => []
    }
  },
  setup() {
    const options = reactive<Options>({
      type: 'open',
      position: 'top-right',
      timeout: 3000,
      isUpdate: false,
      isLoading: false,
      app: true
    })
    const n = ref(1)

    function show() {
      Message[options.isLoading ? 'loading' : options.type](`这是 ${unref(n)} 段信息。`, {
        position: options.position,
        timeout: options.timeout,
        key: options.isUpdate ? 'message' : undefined,
        app: options.app
      })

      n.value++
    }

    function closeAll() {
      Message.closeAll()
    }

    return {
      options,
      show,
      closeAll
    }
  }
})
</script>
