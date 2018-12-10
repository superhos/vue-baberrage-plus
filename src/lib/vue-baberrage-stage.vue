<template>
  <div id="vue-baberrage-stage" 
       class="vue-baberrage-stage"
       :style="propStyle">
      Hello world {{data}}
      <button @click="addItem">add</button>
  </div>
</template>
<script>
import { interval, delay, from, BehaviorSubject, bufferCount } from 'rxjs';
import BarrageService from '../services/barrage.service'

export default {
  name: 'VueBaberrageStage',
  props: ['width','height'],
  data () {
    return {
      barrageService: new BarrageService(),
      data: [],
      propStyle: {
        width: (isNaN(this.width)? this.width :  `${this.width}px`) || '300px',
        height: (isNaN(this.height)? this.height :  `${this.height}px`) || '400px',
        background: '#CCC'
      },
      mySubject: null,
    }
  },
  setConfig ({ mode, uri, data }) {
    console.log(mode)
    console.log(data)
    this.data = data
  },
  mounted () {
    // this.barrageService.count().subscribe(res => {
    //   console.log(res)
    // })
    this.mySubject = new BehaviorSubject(this.data)
    // const arraySource = from(this.test)
    console.log(this.mySubject.pipe)
    console.log(delay)
    this.mySubject.pipe(
      delay(5000)
    ).subscribe(val => console.log(val))
  },
  methods: {
    addItem () {
      this.data.push(Math.floor(Math.random()*10))
      this.mySubject.next(this.data)
    },
  }
}
</script>
<style lang="scss">
</style>