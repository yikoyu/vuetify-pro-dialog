<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { test } from 'vuetify-pro-dialog'

export default defineComponent({
  setup() {
    return {
      test
    }
  }
})
</script>

<template>
  <v-app id="app">
    <v-main>
      <v-btn color="primary" @click="test">Hello World</v-btn>
    </v-main>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
