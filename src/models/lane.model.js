/**
 * Lane Model
 */

export default class LaneModel {
  constructor ({ id, poolWidth, style }) {
    this.id = id
    this.queue = []
    this.defaultPitAmount =  Math.ceil( poolWidth / 330 )// Default 330px per
    // At least two track in one lane for looping.
    this.pitIds = 0
    this.tracks = [{
      id: 0,
      style: 'front',
      isShowing: false,
      currentPit: 0,
      pits: this.buildPits()
    },{
      id: 1,
      style: 'back',
      isShowing: false,
      currentPit: this.defaultPitAmount,
      pits: this.buildPits()
    }]
    this.style = style

    // 监听message队列
  }

  buildPits () {
    return Array.from({length: this.defaultPitAmount}, (e,i) => i).map( (e) => {
      return {
        id: this.pitIds++,
        isUsing: false,
        isShowing: false, // Be true while the Pit displaying
        message: null
      }
    })
  }

  setMessage (message) {
    // 找当前pit
    const track = this.tracks.find(e => e.isShowing)
    const pit = track.currentPit
    console.log(track, pit)
    track.pits.find(e => e.id >= pit && !e.isUsing).message = message
    console.log(this.tracks)
    track.currentPit++
  }

  updateTrackPits(trackId, count) {
    const tracks = this.tracks[trackId]
    const showZone = 100 - count
    let amount = Math.ceil(showZone * this.defaultPitAmount / 100)
    amount = amount >= (this.defaultPitAmount * 2) ? 0 : amount
    tracks.currentPit = amount
    if (amount < this.defaultPitAmount) {
      this.tracks[0].isShowing = true
      this.tracks[1].isShowing = false
    } else {
      this.tracks[0].isShowing = false
      this.tracks[1].isShowing = true
    }
    tracks.pits.forEach(pit => {
      if (pit.id < amount) {
        pit.isShowing = true
      } else {
        // pit.isShowing = false
        // pit.message = null
      }
    })
  }

  getUsageRate () {
    const all = this.defaultPitAmount * 2
    let usage = 0
    this.tracks.map(e => e.pits).forEach(pit => {
      usage += pit.isUsing ? 1 : 0
    })
    return usage / all
  }

  // calculate queue time
  calTime () {
    let time = 0
    if ( this.queue.length ===0 ) return 0
    this.queue.forEach(task => time += task.calTime())
    return time
  }

  calWidth () {
    let width = 0
    if ( this.queue.length ===0 ) return 0
    this.queue.forEach(task => width += task.calWidth())
    return width
  }
}