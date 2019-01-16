import * as types from './mutation-types'

// 设置模式
export const setMode = ({ commit }, mode) => {
  commit(types.SET_MODE, mode)
}

// 弹幕进入队列
export const insertMessage = ({ commit }, messages) => {
  commit(types.INSERT_MESSAGE, messages)
}

export const shiftMessageQueue = ({ commit }) => {
  commit(types.SHIFT_MESSAGE)
}