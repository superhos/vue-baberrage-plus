import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

// export default new Vuex.Store({
//   state: {
//     // 显示泳道
//     displayLanes: {

//     }
//   },
//   mutations: {
//     [INSERT_MESSAGE] (state, payload) {
//       state.messagePool.push(payload.messaeg)
//     }
//   },
//   actions: {
//     // insertMessage ( { commit } ) {
//     //   // commit(INSERT_MESSAGEl)
//     //   // Vue.$observables.message.subscribe
//     // }
//   }
// })
