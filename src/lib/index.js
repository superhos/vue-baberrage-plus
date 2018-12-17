import VueBaberrage from './vue-baberrage'
import BarrageController from '../controllers/barrage.controller'
const log = require('debug')('INFO:VueInstallConfig:')

export default {
  install( Vue, options ){
    // init plugin
    log('Plugin Init')
    options = options || {}
    const barrageConfig = {
      mode: options.mode  || VueBaberrage.LOCAL_MODE,
      uri: options.uri || '',
      lanes: 3,
      ...options
    }
    BarrageController.getInstance().setConfig(barrageConfig)

		Vue.prototype.$Baberrage = BarrageController.getInstance()
	}
}