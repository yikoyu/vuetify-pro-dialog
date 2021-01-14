'use strict'

const path = require('path')

function resolve(dir, dir2 = '', dir3 = '') {
  return path.join(__dirname, dir, dir2, dir3)
}

module.exports = {
  publicPath: '/',

  pages: {
    index: {
      entry: 'examples/main.ts',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },

  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('examples')).set('vuetify-pro-dialog', resolve('src'))

    const eslintRule = config.module.rule('eslint')
    eslintRule
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })
  },
  css: { extract: false },
  productionSourceMap: false
}
