import MessagePoolModel from '../models/message-pool.model'
import PlayerService from '../services/player.service'
import constant from '../config/constant'

const log = require('debug')('INFO:VueInstallConfig:')
const { DEFAULT_POOL_TAG, LOCAL_MODE } = constant

export default class BarrageController {

  static instance

  static getInstance () {
    if(!BarrageController.instance){
      BarrageController.instance = new BarrageController()
    }

    return BarrageController.instance
  }

  setEnv (env) {
    this.env = env
  }

  setConfig (props) {
    log('Config Set')
    // default pool
    this.player = new PlayerService()
    this.config = {
      mode: LOCAL_MODE,
      ...props
    }

    this.messagePool = {
      [DEFAULT_POOL_TAG] : new MessagePoolModel(this,{tag:DEFAULT_POOL_TAG, lanes:props.lanes})
    }
  }

  play () {
    this.player.play()
    this.player.interval((currentTime) => {
      this.playing(currentTime)
    }, 1000)
  }

  pause () {
    this.player.pause()
  }
  
  stop () {
    this.player.stop()
  }

  playing (currentTime) {
    this.currentTime = currentTime
    const messages = this.messageList.filter(message => currentTime === message.display_time)
    if (messages.length > 0) {
      messages.forEach(message => this.push({message}))
    }
    if (this.playerState === BarrageController.PLAYER_START) {
      this.runningPlayer = requestAnimationFrame((time) => this.playing(time))
    }
  }

  push ({pool, message}) {
    this.messagePool[pool || DEFAULT_POOL_TAG].insert(message)
  }
  
  pushList({messageList}) {
    this.messageList = messageList
  }
  
  bindLane ({pool, laneUIData}) {
    this.messagePool[pool || DEFAULT_POOL_TAG].bindLane(laneUIData)
  }
}
