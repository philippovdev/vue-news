const pkg = require('./package')
const bodyParser = require('body-parser')
const axios = require('axios')

const postcssCustomMedia = require('postcss-custom-media');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'LOVA News',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Fresh news from all over the World.'
      }
    ],
    script: [
      {
        "data-ad-client": "ca-pub-6228577781902066",
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#999', height: '4px', duration: 1000 },
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
  plugins: ['~plugins/core-components.js', '~plugins/date-filter.js', '~plugins/filters.js', '~plugins/vue-lazyload.js', { src: '~plugins/ga.js', mode: 'client' }],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['@nuxtjs/axios'],
    [
      'nuxt-sass-resources-loader',
      [
        'assets/styles/main.scss'
      ]
    ],
  ],
  axios: {
    baseURL: process.env.BASE_URL || 'https://admin.lova.news/news/10',
    credentials: false
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        'postcss-url': false,
        'postcss-simple-vars': {},
        'postcss-mixins': {},
        'postcss-nested': {},
        'postcss-hexrgba': {},
        'postcss-preset-env': {
          stage: 0,
          browsers: [
            'last 2 versions',
            'ie >= 11',
          ],
          'cssnano': { preset: 'default' },
        },
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true
        },
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
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
              payload: { postData: res.data[key] }
            })
          }
          return routes
        })
    }
  }
}
