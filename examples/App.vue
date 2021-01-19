<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container fluid>
          <v-row dense>
            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 4">
              <lang></lang>
            </v-col>

            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 4">
              <message :type-list="typeList" :position-list="positionList"></message>
            </v-col>

            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 4">
              <notify :type-list="typeList" :position-list="positionList"></notify>
            </v-col>

            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 4">
              <loading></loading>
            </v-col>

            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 4">
              <confirm :type-list="typeList"></confirm>
            </v-col>

            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 4">
              <alert :type-list="typeList"></alert>
            </v-col>

            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 4">
              <prompt :type-list="typeList"></prompt>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Lang from './components/Lang.vue'
import Message from './components/Message.vue'
import Notify from './components/Notify.vue'
import Loading from './components/Loading.vue'
import Confirm from './components/Confirm.vue'
import Alert from './components/Alert.vue'
import Prompt from './components/Prompt.vue'

export default {
  name: 'App',
  components: {
    Lang,
    Message,
    Notify,
    Loading,
    Confirm,
    Alert,
    Prompt
  },
  data() {
    return {
      typeList: [
        { label: 'Info', value: 'info' },
        { label: 'Success', value: 'success' },
        { label: 'Error', value: 'error' },
        { label: 'Warning', value: 'warning' }
      ],
      positionList: [
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Top-left', value: 'top-left' },
        { label: 'Top-right', value: 'top-right' },
        { label: 'Bottom-left', value: 'bottom-left' },
        { label: 'Bottom-right', value: 'bottom-right' }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss"></style>
