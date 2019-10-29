import Vue from 'vue'

Vue.filter('capitalize', val => val.toUpperCase())
Vue.filter('firstUppercase', val => {
  return val[0].toUpperCase() + val.slice(1)
})
