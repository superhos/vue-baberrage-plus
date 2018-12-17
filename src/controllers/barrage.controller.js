import MessagePoolModel from '../models/message-pool.model'
import PlayerService from '../services/player.service'
import TrackService from '../services/track.service'
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

  setConfig (props) {
    log('Config Set')
    // default pool
    this.player = new PlayerService()
    this.track = new TrackService()
    this.config = {
      mode: LOCAL_MODE,
      ...props
    }

    this.messagePool = {
      [DEFAULT_POOL_TAG] : new MessagePoolModel(this,{tag:DEFAULT_POOL_TAG,lanes:props.lanes})
    }
  }

  play () {
    this.track.start()
    this.player.play()
    this.player.interval((currentTime) => {
      this.playing(currentTime)
    }, 1000)
  }

  pause () {
    this.player.pause()
    this.track.pause()
  }
  
  stop () {
    this.player.stop()
    this.track.pause()
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

  push ({pool, lane, message}) {
    pool = pool || DEFAULT_POOL_TAG
    this.messagePool[pool].insert(message)
  }
  
  pushList({pool, lane, messageList}) {
    pool = pool || DEFAULT_POOL_TAG
    this.messageList = messageList
  }
  
  bindLane ({ pool, laneUIData}) {
    pool = pool || DEFAULT_POOL_TAG
    this.messagePool[pool].bindLane(laneUIData)
  }
}
