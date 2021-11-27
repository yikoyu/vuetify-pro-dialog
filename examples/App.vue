<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { locale, MessageOptions } from 'vuetify-pro-dialog'

import MessageExample from './model/MessageExample.vue'
import NotifyExamle from './model/NotifyExamle.vue'
import MessageBoxExample from './model/MessageBoxExample.vue'

export default defineComponent({
  components: { MessageExample, NotifyExamle, MessageBoxExample },
  setup(props, { root }) {
    const types = ref<Exclude<MessageOptions['type'], 'loading'>[]>(['info', 'success', 'error', 'warning'])
    const positions = ref<MessageOptions['position'][]>(['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'])

    function setLocale(lang: string) {
      if (lang) locale.set(lang)
    }

    function setRtl(bool: boolean) {
      if (typeof bool === 'boolean') {
        root.$vuetify.rtl = bool
        root.$dialog.setRTL(bool)
      }
    }

    function setDark(bool: boolean) {
      if (typeof bool === 'boolean') {
        root.$vuetify.theme.dark = bool
      }
    }

    return {
      types,
      positions,
      setLocale,
      setRtl,
      setDark
    }
  }
})
</script>

<template>
  <v-app id="app">
    <v-app-bar app color="primary" dark dense>
      <v-avatar tile size="32">
        <v-img src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light.svg" alt="logo" />
      </v-avatar>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col md="6" cols="12">
            <v-col md="6" cols="12">
              <v-card class="overflow-hidden" outlined>
                <v-card-title>特殊设置</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-radio-group value="zh-CN" hide-details label="语言" @change="setLocale">
                    <v-radio label="中文" value="zh-CN"></v-radio>
                    <v-radio label="英语" value="en-US"></v-radio>
                  </v-radio-group>
                  <v-checkbox label="RTL" hide-details @change="setRtl"></v-checkbox>
                  <v-checkbox label="Dark" hide-details @change="setDark"></v-checkbox>
                </v-card-text>
              </v-card>
            </v-col>
          </v-col>
          <v-col md="6" cols="12">
            <message-example :types="[...types, 'open']" :positions="positions" />
          </v-col>
          <v-col md="6" cols="12">
            <notify-examle :types="[...types, 'open']" :positions="positions" />
          </v-col>
          <v-col md="6" cols="12">
            <message-box-example :types="[...types]" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* background-color: #f2f4fa; */
}

.v-sheet.app-code {
  margin: 16px 0;
  position: relative;
  padding: 12px 50px 12px 16px;
}
</style>
