import { resolve } from 'path'
import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
import { createVuePlugin } from 'vite-plugin-vue2'
import eslintPlugin from 'vite-plugin-eslint'
import dts from 'vite-plugin-dts'

import Components from 'unplugin-vue-components/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin({
      jsx: true
    }),
    Components({
      resolvers: [VuetifyResolver()]
    }),
    dts({
      tsConfigFilePath: 'tsconfig.lib.json',
      insertTypesEntry: true
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
      'vuetify-pro-dialog': resolve(__dirname, 'src'),
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
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
})
