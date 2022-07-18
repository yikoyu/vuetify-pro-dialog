<template>
  <v-sheet class="overflow-hidden" outlined rounded v-bind="$attrs">
    <v-row no-gutters>
      <!-- 展示区域 -->
      <v-col cols="12" md="8">
        <v-sheet class="d-flex align-center" height="44px">
          <v-divider vertical></v-divider>
          <div class="px-3 text-h6 font-weight-medium text--primary">{{ title }}</div>
        </v-sheet>
        <v-divider></v-divider>
        <v-sheet
          class="overflow-y-auto fill-height d-flex align-center justify-center pa-4"
          :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-5'"
          :min-height="contentHeight"
          :max-height="contentHeight"
        >
          <slot></slot>
        </v-sheet>
      </v-col>
      <!-- 配置区域 -->
      <v-col cols="12" md="4">
        <v-sheet class="d-flex align-center" height="44px">
          <v-divider vertical></v-divider>
          <div class="px-3 text-h6 font-weight-medium text--primary">选项</div>
        </v-sheet>
        <v-divider></v-divider>
        <div class="d-flex">
          <v-divider vertical></v-divider>
          <v-responsive class="overflow-y-auto pa-3" height="100%" :min-height="contentHeight" :max-height="contentHeight">
            <slot name="config"></slot>
          </v-responsive>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ExampleArea',
  props: {
    title: {
      type: String,
      default: ''
    },
    contentHeight: {
      type: String,
      default: '400px'
    }
  }
})
</script>
