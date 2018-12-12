/**
 * Lane Model
 */

export default class LaneModel {
  constructor ({ id, style }) {
    this.id = id
    this.queue = []
    this.style = style
  }

  // calculate queue time
  calTime () {
    let time = 0
    if ( this.queue.length ===0 ) return 0
    this.queue.forEach(task => time += task.calTime())
    return time
  }
}