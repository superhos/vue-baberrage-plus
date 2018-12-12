import MessagePoolModel from '../models/message-pool.model'
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

  static PLAYER_STOP = 'player_stop'
  static PLAYER_START = 'player_start'
  static PLAYER_PAUSE = 'player_pause'

  constructor(props) {
		if (__instance()) return __instance();
    //按自己需求实例化
    // default pool
    this.runningTime = 0
    this.playerState = BarrageService.PLAYER_STOP
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
    if (!this.messageList) {
      throw new Error('ParamInvaild: Message List can not be null')
    }
    if (this.messageList.length === 0) return
    this.playerState = BarrageService.PLAYER_START
    this.runningTime = new Date().getTime()
    this.runningPlayer = requestAnimationFrame((time) => this.playing(time))
  }

  playing (currentTime) {
    this.currentTime = currentTime
    const messages = this.messageList.filter(message => {
      return this.currentTime >= message.display_time && 
              this.currentTime < message.display_time + 50
    })
    if (messages.length > 0) {
      console.log(messages)
      messages.forEach(message => this.pushMessage({message}))
    }
    if (this.playerState === BarrageService.PLAYER_START) {
      this.runningPlayer = requestAnimationFrame((time) => this.playing(time))
    }
  }

  pause () {
    this.playerState = BarrageService.PLAYER_PAUSE
  }

  stop () {
    this.playerState = BarrageService.PLAYER_STOP
    this.currentTime = -1
    this.runningTime = -1
    this.runningPlayer = null
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
