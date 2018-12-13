import MessagePoolModel from '../models/message-pool.model'
import PlayerService from './player.service'
import TrackService from './track.service'
import constant from '../config/constant'

const { DEFAULT_POOL_TAG, LOCAL_MODE } = constant

// Singleton Mode
let __instance = (function () {
  let instance;
  return (newInstance) => {
    if (newInstance) instance = newInstance;
    return instance;
  }
}());

export default class BarrageService {

  constructor(props) {
		if (__instance()) return __instance();
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
	  __instance(this);
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
      messages.forEach(message => this.pushMessage({message}))
    }
    if (this.playerState === BarrageService.PLAYER_START) {
      this.runningPlayer = requestAnimationFrame((time) => this.playing(time))
    }
  }

  pushMessage ({pool, lane, message}) {
    pool = pool || DEFAULT_POOL_TAG
    this.messagePool[pool].insert(message)
  }

  setMessageList({pool, lane, messageList}) {
    pool = pool || DEFAULT_POOL_TAG
    this.messageList = messageList
  }

  bindLane ({ pool, laneUIData}) {
    pool = pool || DEFAULT_POOL_TAG
    console.log(pool)
    this.messagePool[pool].bindLane(laneUIData)
  }
}
