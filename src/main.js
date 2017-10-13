import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)
//VUE MATERIAL SETTINGS

new Vue({
  el: '#app',
  render: h => h(App)
})
