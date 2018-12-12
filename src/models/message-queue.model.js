/**
 * Message Model defined
 * @author SevensChan <297495165@qq.com>
 */
import config from '../config'
import uuidv4 from 'uuid/v4'

export default class MessageQueueModel {
  constructor (options) {
    this.queue = options.queue
    this.startTime = 0
    this.currentTime = 0
    this.id = uuidv4()
    this.isLoop = false
    this.notRunning = true
    this.width = this.calWidth()
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