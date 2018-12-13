/**
 * 一直滚动的track
 */
import config from '../config'

let __instance = (function () {
  let instance;
  return (newInstance) => {
    if (newInstance) instance = newInstance;
    return instance;
  }
}());

export default class TrackService {
  
  // state
  static ROLLING = 'rolling'
  static STOP    = 'stop'
  static INIT    = 'init'

  constructor() {
		if (__instance()) return __instance();
    this.setState(TrackService.INIT)
    this.packages = []
    this.state = TrackService.INIT
    this.runningTime = 0 // 统计总运行时间
    this.listeners = {}
    this.width = window.innerWidth
	  __instance(this);
  }

  setState(state) {
    this.state = state
    switch (state) {
      case TrackService.STOP:
            this.state = TrackService.STOP
            break;
      case TrackService.INIT:break;
      case TrackService.ROLLING:
            this.state = TrackService.ROLLING
            this.lastTime = 0
            this.frameHandler = requestAnimationFrame((time) => { this.rolling(time)})
            break;
    }
  }

  start () {
    this.setState(TrackService.ROLLING)
  }

  pause () {
    this.setState(TrackService.STOP)
  }

  rolling (currentTime) {
    if (!this.lastTime) this.lastTime = currentTime
    let gapTime = currentTime - this.lastTime
    this.lastTime = currentTime

    if (gapTime !== 0) {
      this.packages.forEach(pkg => {
        pkg.gapTime = gapTime
        this.calLeft (pkg)
      })
      this.emit ('UPDATE_QUEUE', this.packages)
    }
    
    if (this.state === TrackService.ROLLING) {
      this.frameHandler = requestAnimationFrame((time) => { this.rolling(time)})
    }
  }

  calLeft (pkg) {
    // let gap = pkg.currentTime - pkg.startTime
    // // Remove overtime package
    if (pkg.left < (0 - pkg.width)) {
      this.packages.splice(this.packages.indexOf(pkg), 1)
      this.emit('REMOVE_QUEUE', pkg)
      return
    }

    if (!pkg.v) pkg.v = (this.width + pkg.width) / pkg.time
    // console.log(pkg.gapTime)
    let distance = pkg.v * pkg.gapTime
    pkg.force(distance)
  }

  addPackage (pkg) {
    if (!pkg) return
    pkg.startTime = this.currentTime
    pkg.time = pkg.time || config.default_time 
    pkg.reposition(this.width)
    this.packages.push(pkg)
    // console.log(this.packages)
  }

  addEventListener(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = []
    this.listeners[event].push(callback)
  }

  emit (event, data) {
    if (!this.listeners[event]) return
    this.listeners[event].forEach(evt => evt(data))
  }
}
