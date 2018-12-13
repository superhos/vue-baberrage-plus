/**
 * Message Model defined
 * @author SevensChan <297495165@qq.com>
 */
import config from '../config'
import uuidv4 from 'uuid/v4'

export default class MessageQueueModel {

  static DIRECTION_RIGHT_TO_LEFT = 'right' // right to left
  static DIRECTION_LEFT_TO_RIGHT  = 'left' // left to RIGHT

  constructor (options) {
    this.queue = options.queue
    this.direction = MessageQueueModel.DIRECTION_RIGHT_TO_LEFT
    console.log(MessageQueueModel.DIRECTION_LEFT_TO_RIGHT)
    this.startTime = 0
    this.currentTime = 0
    this.id = uuidv4()
    this.isLoop = false
    this.notRunning = true
    this.style = {}
    this.width = this.calWidth()
  }

  isFinish () {
    if (!this.laneWidth) {
      throw new Error ('ParamInvaild: Please execute `reposition(landWidth)` firstly.')
    }
    switch (this.direction) {
      case MessageQueueModel.DIRECTION_LEFT_TO_RIGHT : return this.left > (this.laneWidth - this.width)? true : false
      case MessageQueueModel.DIRECTION_RIGHT_TO_LEFT: return this.left < (0 - this.width)? true : false
    }
  }

  // 重新放置初始位置
  reposition (laneWidth) {
    this.laneWidth = laneWidth
    console.log(this.direction)
    switch (this.direction) {
      case MessageQueueModel.DIRECTION_LEFT_TO_RIGHT : this.left = - this.width ;break;
      case MessageQueueModel.DIRECTION_RIGHT_TO_LEFT : this.left = laneWidth;break;
    }

    this.style.left = this.left + 'px'
  }

  // 受力
  force (distance) {
    if (!this.laneWidth) {
      throw new Error ('ParamInvaild: Please execute `reposition(landWidth)` firstly.')
    }
    // console.log(distance)
    switch (this.direction) {
      case MessageQueueModel.DIRECTION_LEFT_TO_RIGHT : this.left += distance;break;
      case MessageQueueModel.DIRECTION_RIGHT_TO_LEFT : this.left -= distance;break;
    }
    this.style.left = this.left + 'px'
  }

  // Calculate the width of the queue
  calWidth () {
    let len = 0
    this.queue.forEach(message => {
      len += message.content.length * config.default_font_size
    })
    return len
  }

  calTime () {
    let time = 0
    if ( this.queue.length ===0 ) return 0
    let tasks = []
    this.queue.forEach(task => {
      tasks = [
        ...tasks,
        task
      ]
    })
    tasks.forEach(task => time += task.time)
    return time
  }
}