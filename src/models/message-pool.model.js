const log = require('debug')('INFO:MessagePool:')
import { from, interval, BehaviorSubject } from 'rxjs';
import { filter, bufferTime } from 'rxjs/operators';
import MessageModel from './message.model'
import MessageQueueModel from './message-queue.model'
import config from '../config'
import { buffer } from 'rxjs-compat/operator/buffer';

// Message总调度
export default class MessagePoolModel {
  constructor (service, {tag,lanes}) {
    this.service = service
    this.poolTag = tag
    this.lanes = lanes
    this.lanePool = {}
    this.messageQueue$ = new BehaviorSubject()
    this.startWatch()
  }

  startWatch () {
    log('Start Watching')
    this.messageQueue$.pipe(
      bufferTime(1000, 1000, 3),
    ).subscribe(val => {
      // Queue分配到lane中展示
      this.chooseLaneAndPushMessage(val)
    })
  }

  chooseLaneAndPushMessage (messageList) {
    messageList = messageList.filter(e => e)
    if (messageList.length === 0) return
    const lane = this[`${config.balance_algorithm}Balance`]()
    lane.queue.push(new MessageQueueModel({ queue: messageList.filter(e => e)}))
  }

  // 时长轮询均衡算法
  timeBalance () {
    // 通过总时长计算权值，选择权重最低的lane加入
    let result = {}
    for (let key in this.lanePool) {
      let lane = this.lanePool[key]
      let score = lane.calTime()
      if (score === 0) return lane
      if (!result[score]) result[score] = []
      result[score].push(lane)
    }
    return result[Math.min(...Object.keys(result).map(e => +e))][0]
  }

  // 随机均衡算法 
  randomBalance () {
    let rand = Math.floor(Math.random() * this.lanes)
    return this.lanePool[rand]
  }

  bindLane (laneUIData) {
      this.lanePool = laneUIData
  }

  insert (message) {
    this.messageQueue$.next(new MessageModel(message))
  }
}