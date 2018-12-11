const log = require('debug')('INFO:VueInstallConfig:')
let service

module.exports = {
  
  install(Vue,options){
		Vue.prototype.$babe_push = ({
      pool, lane, message
    }) => {
      // console.log(pool, lane, message)
      service.pushMessage({message})
    }
    
    Vue.prototype.$babe_set_current_service = (svice) => {
      service = svice
    }

    Vue.prototype.$current_pool = () => {
      console.log(1, 2, 3)
		}
	}
}