<template>
  <v-card class="mb-4">
    <v-toolbar flat dense>
      <v-toolbar-title>Loading</v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
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
  name: 'Loading',
  data() {
    return {
      type: 'info',
      position: 'top-right',
      timeout: 3000
    }
  },
  methods: {
    show() {
      const loading = Message.loading('加载中...')

      if (this.timeout > 0) setTimeout(() => loading.close(), this.timeout)
    },
    closeAll() {
      Message.closeAll()
    }
  }
}
</script>
