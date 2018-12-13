const log = require('debug')('INFO:VueInstallConfig:')
let service

module.exports = {
  
  install(Vue,options){
		Vue.prototype.$babePush = ({
      pool, lane, message
    }) => {
      // console.log(pool, lane, message)
      service.pushMessage({message})
    }

    Vue.prototype.$babePushListAndPlay = ({
      pool, lane, messageList
    }) => {
      // console.log(pool, lane, message)
      service.setMessageList({messageList})
      service.play()
    }

    Vue.prototype.$babePlay = () => {
      // 开始播放
      service.play()
    }

    Vue.prototype.$babeStop = () => {
      // 开始播放
      service.stop()
    }

    Vue.prototype.$babePause = () => {
      // 开始播放
      service.pause()
    }
    
    Vue.prototype.$babe_set_current_service = (svice) => {
      service = svice
    }

    Vue.prototype.$current_pool = () => {
      console.log(1, 2, 3)
		}
	}
}