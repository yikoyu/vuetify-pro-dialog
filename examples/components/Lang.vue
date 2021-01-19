<template>
  <v-card class="mb-4">
    <v-toolbar flat dense>
      <v-toolbar-title>Lang</v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <v-radio-group v-model="lang" label="语言" @change="setLang">
        <v-radio label="中文" value="zh-CN"></v-radio>
        <v-radio label="英语" value="en-US"></v-radio>
      </v-radio-group>
    </v-card-text>
  </v-card>
</template>

<script>
import { setLocale } from 'vuetify-pro-dialog'

export default {
  name: 'Lang',
  data() {
    return {
      lang: 'zh-CN'
    }
  },
  methods: {
    setLang(e) {
      setLocale(e)
    }
  }
}
</script>
