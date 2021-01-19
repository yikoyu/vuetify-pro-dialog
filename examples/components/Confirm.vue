<template>
  <v-card class="mb-4">
    <v-toolbar flat dense>
      <v-toolbar-title>Confirm</v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <v-radio-group v-model="type" label="类型">
        <v-radio v-for="item in typeList" :key="item.label" :label="item.label" :value="item.value"></v-radio>
      </v-radio-group>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="closeAll">关闭全部</v-btn>
      <v-btn @click="show" color="primary">显示</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { MessageBox, Message } from 'vuetify-pro-dialog'

export default {
  name: 'Confirm',
  props: {
    typeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      type: 'info'
    }
  },
  methods: {
    async show() {
      const res = await MessageBox.confirm('这是一段信息。', '提示', {
        type: this.type
      })

      if (res) Message.success('点击了确定')
      if (!res) Message.error('点击了取消')
    },
    closeAll() {
      MessageBox.closeAll()
    }
  }
}
</script>
