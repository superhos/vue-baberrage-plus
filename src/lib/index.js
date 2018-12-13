const log = require('debug')('INFO:VueInstallConfig:')
let controller

module.exports = {
  install( Vue, options ){
		Vue.prototype.$babePush = ({
      pool, lane, message
    }) => {
      // console.log(pool, lane, message)
      controller.pushMessage({message})
    }

    Vue.prototype.$babePushListAndPlay = ({
      pool, lane, messageList
    }) => {
      // console.log(pool, lane, message)
      controller.setMessageList({messageList})
      controller.play()
    }

    Vue.prototype.$babePlay = () => {
      // 开始播放
      controller.play()
    }

    Vue.prototype.$babeStop = () => {
      // 开始播放
      controller.stop()
    }

    Vue.prototype.$babePause = () => {
      // 开始播放
      controller.pause()
    }
    
    Vue.prototype.$babe_set_barrage_controller = (contl) => {
      controller = contl
    }

    Vue.prototype.$current_pool = () => {
      console.log(1, 2, 3)
		}
	}
}