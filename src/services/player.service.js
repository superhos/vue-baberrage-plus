/**
 * Player service
 */

 // Singleton Mode
let __instance = (function () {
  let instance;
  return (newInstance) => {
    if (newInstance) instance = newInstance;
    return instance;
  }
}());

export default class PlayerService {

  static PLAYER_STOP = 'player_stop'
  static PLAYER_START = 'player_start'
  static PLAYER_PAUSE = 'player_pause'


  constructor(props) {
		if (__instance()) return __instance();
    this.runningStartTime = 0
    this.runningFrameTime = 0
    this.countFrameTime = 0 // 总运行时间
    this.playerState = PlayerService.PLAYER_STOP
    this.intervalEvent = {}
	  __instance(this);
  }

  interval (callback, timegap) {
    if (!this.intervalEvent[timegap])this.intervalEvent[timegap] = []
    this.intervalEvent[timegap].push(callback)
  }

  timeCounter (currentTime) {
    if (this.playerState === PlayerService.PLAYER_START) {
      if (!this.runningFrameTime || currentTime - this.runningFrameTime >= 1000) {
        this.countFrameTime += 1000
        // every sec
        this.runningFrameTime = currentTime
        // check interval Event
        Object.keys(this.intervalEvent).forEach(timegap => {
          if (this.countFrameTime % timegap === 0) {
            this.intervalEvent[timegap].forEach(evt => evt(this.countFrameTime))
          }
        })
      }
      this.runningPlayer = requestAnimationFrame((time) => this.timeCounter(time))
    }
  }

  play () {
    if ( this.playerState !== PlayerService.PLAYER_STOP ) {
      this.runningStartTime = new Date().getTime()
      this.countFrameTime = 0
    }
    this.playerState = PlayerService.PLAYER_START
    this.runningPlayer = requestAnimationFrame((time) => this.timeCounter(time))
  }

  pause () {
    this.playerState = PlayerService.PLAYER_PAUSE
    this.cleanIntervel()
  }

  stop () {
    this.playerState = PlayerService.PLAYER_STOP
    this.runningFrameTime = -1
    this.runningStartTime = -1
    this.countFrameTime = 0
    this.runningPlayer = null
    this.cleanIntervel()
  }

  cleanIntervel () {
    this.intervalEvent = {}
  }
}