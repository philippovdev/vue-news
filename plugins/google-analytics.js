import Vue from 'vue'
import vueAnalytics from 'vue-analytics'

const getGDPR = localStorage.getItem('GDPR:accepted')

export default (ctx, inject) => {
  if (typeof getGDPR !== 'undefined' && getGDPR === 'true') {
    Vue.use(vueAnalytics, {
      id: 'UA-74645070-2',
      disabled: false,
      route: ctx.app.router
    })
    ctx.$ga = Vue.$ga
    inject('ga', Vue.$ga)
  } else if (typeof getGDPR !== 'undefined' && getGDPR === 'false') {
    Vue.use(vueAnalytics, {
      id: 'UA-74645070-2',
      disabled: true,
    })
  }
}
