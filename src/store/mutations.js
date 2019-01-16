import * as types from './mutation-types'

const mutations = {
  // Base
  [types.SET_MODE](state, mode) {
    state.mode = mode
  },
  //Message
  [types.INSERT_MESSAGE] (state, payload) {
    state.messageQueue = state.messageQueue.concat(payload.messages)
  },
  [types.SHIFT_MESSAGE] (state, payload) {
    state.messageQueue.shift()
  }
} 

export default mutations