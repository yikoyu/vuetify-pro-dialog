<template>
  <prism-code ref="code" :code="code" :inline="inline" :language="language" v-bind="$attrs" class="pa-0 my-0 grey lighten-5" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import MarkdownIt from 'markdown-it'
import prism from 'markdown-it-prism'

import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-pug'
import 'prismjs/components/prism-sass'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-stylus'
import 'prismjs/components/prism-typescript'

// Components
import PrismCode from './PrismCode.vue'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

md.use(prism)

export default defineComponent({
  name: 'MarkupText',
  components: { PrismCode },
  props: {
    code: {
      type: String,
      default: ''
    },
    inline: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'markup'
    }
  }
})
</script>
