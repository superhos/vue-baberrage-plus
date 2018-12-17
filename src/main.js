import Vue from 'vue'
import App from './App.vue'
import store from './store/index'

// import Rx from 'rxjs'
const Rx = require('rxjs')
import VueRx from 'vue-rx'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueBaberrage from './lib'

Vue.use(VueBaberrage)

Vue.use(VueRx, Rx)
Vue.config.productionTip = false

Vue.use(VueAxios, axios)

// Debug Setting
localStorage.setItem('debug','INFO:*')

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
