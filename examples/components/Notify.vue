<template>
  <v-card class="mb-4">
    <v-toolbar flat dense>
      <v-toolbar-title>Notify</v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <v-radio-group v-model="type" label="类型">
        <v-radio v-for="item in typeList" :key="item.label" :label="item.label" :value="item.value"></v-radio>
      </v-radio-group>

      <v-radio-group v-model="position" label="位置">
        <v-radio v-for="item in positionList" :key="item.label" :label="item.label" :value="item.value"></v-radio>
      </v-radio-group>

      <v-slider v-model="timeout" label="时间" :min="-1" :max="10000" thumb-label="always"></v-slider>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="closeAll">关闭全部</v-btn>
      <v-btn @click="show" color="primary">显示</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Message } from 'vuetify-pro-dialog'

export default {
  name: 'Notify',
  props: {
    typeList: {
      type: Array,
      default: () => []
    },
    positionList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      type: 'info',
      position: 'top-right',
      timeout: 3000
    }
  },
  methods: {
    show() {
      Message.notify[this.type]('这是一段信息。', {
        position: this.position,
        timeout: this.timeout
      })
    },
    closeAll() {
      Message.closeAll()
    }
  }
}
</script>
