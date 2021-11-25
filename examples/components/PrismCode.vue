<script lang="tsx">
import { h, defineComponent } from '@vue/composition-api'
import Prism from 'prismjs'

export default defineComponent({
  name: 'PrismCode',
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
  },
  setup(props, { slots, attrs }) {
    const code = props.code
    const inline = props.inline
    const language = props.language
    const prismLanguage = Prism.languages[language]
    const className = `language-${language}`

    if (process.env.NODE_ENV === 'development' && !prismLanguage) {
      throw new Error(
        `Prism component for language "${language}" was not found, did you forget to register it? See all available ones: https://cdn.jsdelivr.net/npm/prismjs/components/`
      )
    }
    return () => {
      if (inline) {
        return h('div', {
          class: [className],
          domProps: {
            innerHTML: Prism.highlight(code as string, prismLanguage, language)
          }
        })
      }

      return h(
        'pre',
        {
          ...attrs,
          class: [attrs.class, className]
        },
        [
          h('div', {
            ...attrs,
            class: [attrs.class, className],
            domProps: {
              innerHTML: Prism.highlight(code as string, prismLanguage, language)
            }
          })
        ]
      )
    }
  }
})
</script>
