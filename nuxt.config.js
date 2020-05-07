const pkg = require('./package')
const bodyParser = require('body-parser')
const axios = require('axios')

const postcssCustomMedia = require('postcss-custom-media')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'LOVA News',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: 'Fresh news from all over the World.'
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#999', height: '4px', duration: 1000},
  loadingIndicator: {
    name: 'circle',
    color: '#999'
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js',
    '~plugins/filters.js',
    '~plugins/vue-lazyload.js',
    {src: '~plugins/script2', mode: 'client'},
    {src: '~/plugins/google-analytics.js', mode: 'client'}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['@nuxtjs/axios',
      '@nuxtjs/proxy',
      'nuxt-sass-resources-loader',
      [
        'assets/styles/main.scss'
      ]
    ],
    ['@naumstory/nuxtjs-yandex-metrika',
      {
        id: '62530381',
        webvisor: true,
        clickmap: true,
        useCDN: false,
        trackLinks: true,
        accurateTrackBounce: true,
      }
    ]
  ],
  axios: {
    baseURL: process.env.BASE_URL || 'https://admin.lova.news/news/10',
    credentials: false,
  },

  /*
  ** Build configuration
  */

  buildModules: [
    '@nuxtjs/google-analytics'
  ],
  googleAnalytics: {
    id: 'UA-74645070-2',
    checkDuplicatedScript: true
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://admin.lova.news/',
    fbAPIKey: 'AIzaSyCQCdp9jUi4MPrJfK6Zw-DLFFNioeszbdY'
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  router: {
    linkActiveClass: 'nuxt-active-link',
    linkExactActiveClass: 'nuxt-exactive-active-link',
    // middleware: 'log'
  },
  serverMiddleware: [bodyParser.json(), '~/api'],
  generate: {
    routes: function () {

      return axios
        .get('https://admin.lova.news/news/200')
        .then(res => {
          const routes = []
          for (const key in res.data) {
            routes.push({
              route: `/news/${key.category.name}/${key.slug}/${key.id}`,
              payload: {postData: res.data[key]}
            })
          }
          return routes
        })
    }
  }
}
