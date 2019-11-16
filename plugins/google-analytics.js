import Vue from 'vue'
import vueAnalytics from 'vue-analytics'

const getGDPR = localStorage.getItem('GDPR:accepted')

if (typeof getGDPR !== 'undefined' && getGDPR === 'true') {
  console.log('I am ebled')
  Vue.use(vueAnalytics, {
    id: 'UA-74645070-2',
    disabled: false
  })
} else if (typeof getGDPR !== 'undefined' && getGDPR === 'false') {
  console.log('I am disabled')
  Vue.use(vueAnalytics, {
    id: 'UA-74645070-2',
    disabled: true,
  })
}
