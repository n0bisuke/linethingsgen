import pkg from './package'

const title = `LINE Things Scenario-Set Generator (β)`;

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { property:'og:locale', content:'ja_JP'},

      { hid: 'og:title', property:'og:title', content: 'LINE Things Scenario-Set Generator (β)'},
      { hid: 'og:type', property:'og:type', content: 'website'},
      { hid: 'og:image', property:'og:image', content: 'https://n0bisuke.github.io/linethingsgen/ogp.png'},

      { name:'twitter:card', content:'summary_large_image'},
      { name:'twitter:site', content:'@n0bisuke'},
      { name:'twitter:creator', content:'@n0bisuke'},
      { hid: 'twitter:title', name:'twitter:title', content: title},
      { hid: 'twitter:image', name:'twitter:image', content: `https://n0bisuke.github.io/linethingsgen/ogp.png`},

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/linethingsgen/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/proxy',
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '@nuxtjs/pwa',
    ['@nuxtjs/google-analytics', {
      id: 'UA-38416208-13'
    }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // proxy: true,
  },
  proxy: {
    // '/things': 'https://api.line.me/things/v1/trial/products',
    // '/connpass': 'https://connpass.com/api/v1/event/?keyword=python'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  //GitHub Pages向け設定
  generate: {
    dir: "docs"
  },
  router: {
    base: '/linethingsgen/'
  }
  
}
