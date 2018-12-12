/**
 * 一直滚动的track
 */
import config from '../config'
import { runInThisContext } from 'vm';

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
  static INIT    = 'int'

  constructor(props) {
		if (__instance()) return __instance();
    this.setState(TrackService.INIT)
    this.packages = []
    this.listeners = {}
    this.width = window.innerWidth
	  __instance(this);
  }

  setState(state) {
    switch (state) {
      case TrackService.STOP:break;
      case TrackService.INIT:break;
      case TrackService.ROLLING:
            this.frameHandler = requestAnimationFrame((time) => { this.rolling(time)})
            break;
    }
    this.state = state
  }

  start () {
    this.setState(TrackService.ROLLING)
  }

  rolling (currentTime) {
    this.currentTime = currentTime
    this.packages.forEach(pkg => {
      pkg.currentTime = currentTime
      this.calLeft (pkg)
    })
    this.frameHandler = requestAnimationFrame((time) => { this.rolling(time)})
  }

  calLeft (pkg) {
    let gap = this.currentTime - pkg.startTime
    // Remove overtime package
    if (gap > config.default_time) {
      this.packages.splice(this.packages.indexOf(pkg), 1)
      this.emit('REMOVE_QUEUE', pkg)
      return
    }

    if (!pkg.v) pkg.v = (this.width + pkg.width) / config.default_time 
    let distance = pkg.v * gap
    let left = - pkg.width + distance
    pkg.style = {
      left: left + 'px'
    }
  }

  addPackage (pkg) {
    pkg.startTime = this.currentTime
    pkg.style = {
      left: 0//this.width + 'px'
    }
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
