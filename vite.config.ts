import { resolve } from 'path'
import { defineConfig, UserConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
import { createVuePlugin } from 'vite-plugin-vue2'
import eslintPlugin from 'vite-plugin-eslint'
import dts from 'vite-plugin-dts'

import Components from 'unplugin-vue-components/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isExamples = mode === 'examples'

  const config: UserConfig = {
    base: './',
    plugins: [
      createVuePlugin({
        jsx: true
      }),
      Components({
        dirs: undefined,
        dts: false,
        resolvers: [VuetifyResolver()]
      }),
      eslintPlugin({
        fix: true
      })
    ],
    optimizeDeps: {
      include: ['vue', '@vue/composition-api', 'vuetify', 'vuetify/lib']
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }

  if (isExamples) {
    const build: UserConfig['build'] = {
      rollupOptions: {
        output: {
          manualChunks(id) {
            const chunks = [
              { test: /[\\/]node_modules[\\/]_?vue\//, name: 'chunk-vue' },
              { test: /[\\/]node_modules[\\/]_?vuetify(.*)/, name: 'chunk-vuetify' }
            ]

            const chunk = chunks.find(({ test }) => test.test(id))
            if (chunk) return chunk.name
          }
        }
      }
    }

    config.build = build

    return config
  }

  const build: UserConfig['build'] = {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VuetifyProDialog'
    },
    rollupOptions: {
      output: {
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify',
          'vuetify/lib': 'VuetifyLib'
        }
      },
      external: ['vue', 'vuetify', 'vuetify/lib']
    }
  }

  const dtsPlugin = dts()

  config.plugins?.push(dtsPlugin)
  config.build = build

  return config
})
