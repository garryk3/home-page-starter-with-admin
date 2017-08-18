const { join } = require('path')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'template' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'vue-notifications', 'vuetify'],
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: ['~plugins/vue-notifications', '~plugins/vuetify.js'],
  css: [
    { src: join(__dirname, 'css/app.styl'), lang: 'styl' }
  ]
}
