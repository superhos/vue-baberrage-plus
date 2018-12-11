const log = require('debug')('INFO:MessagePool:')
import { BehaviorSubject } from 'rxjs';
import { bufferTime } from 'rxjs/operators';
import MessageModel from './message.model'
import config from '../config'

// Message总调度
export default class MessagePoolModel {
  constructor ({tag,lanes}) {
    this.poolTag = tag
    this.lanes = lanes
    this.lanePool = {}
    this.messageQueue$ = new BehaviorSubject()
    this.startWatch()
  }

  startWatch () {
    log('Start Watching')
    this.messageQueue$.pipe(
      bufferTime(3000)
    ).subscribe(val => {
      // Queue分配到lane中展示
      const lane = this[`${config.balance_algorithm}Balance`]()
      console.log(lane)
      lane.queue.push(val.filter(e => e))

      // console.log(this.lanePool)
    })
  }

  // 时长轮询均衡算法
  timeBalance () {
    // 通过总时长计算权值，选择权重最低的lane加入
    let result = {}
    for (let key in this.lanePool) {
      let lane = this.lanePool[key]
      let score = lane.queue.length === 0 ? 0 : ( lane.queue.length === 1 ? lane.queue[0].time : (lane.queue.reduce((cal,cur) => {
        cal = typeof cal === 'object' ? cal.time : cal
        return cal + cur.time
      })))
      if (score === 0) return lane
      if (!result[score]) result[score] = []
      result[score].push(lane)
    }
    return result[Math.min(...Object.keys(result).map(e => +e))][0]
  }

  // 随机均衡算法 
  randomBalance () {
    let rand = Math.floor(Math.random() * this.lanes)
    console.log(this.lanePool)
    return this.lanePool[rand]
  }

  bindLane (laneUIData) {
    // Array.from({length: this.lanes}, (v, i) => {
    //   this.lanePool[`lane_${i}`] = []
    // })
      this.lanePool = laneUIData
  }

  insert (message) {
    console.log(new MessageModel(message))
    // this.messageQueue.push(new MessageModel(message))
    this.messageQueue$.next(new MessageModel(message))
  }
}