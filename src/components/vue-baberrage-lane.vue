<template>
  <div class="vue-baberrage-lane">
    <div class="vue-baberrage-lane-box">
      <!-- 三轨道循环 -->
      <div :key="'track_' + track.id" class="vue-baberrage-track" :style="track.style === 'front' ? trackOneStyle: trackTwoStyle" v-for="track in model.tracks">
        <ul>
          <li :key="'pit_' + pit.id" v-for="pit in track.pits">
            {{pit.message && pit.message.content}}
          </li>
        </ul>
      </div>
    </div>
      <!-- <div class="vue-baberrage-msg" :style="task.style" v-for="(task,key) in queueData" :key="key">
        <ul>
          <li :style="messageStyle" v-for="item in task.queue" :key="item.id">
            {{item.content}}
          </li>
        </ul>
      </div> -->
        <!-- <div class="vue-baberrage-msg" v-for="(task,key) in queueData" :key="key">
        <ul>
          <li v-for="item in task" :key="item.id">
            {{item.content}}
          </li>
        </ul>
      </div> -->
  </div>
</template>
<script>
import config from '../config'
import { requestAnimationFrame } from '../utils'
import { using } from 'rxjs';

export default {
  props: ['queue','model'],
  name : 'VueBaberrageLane',
  computed: {
    queueData: {
      get () {
        return this.queue
      },
      set (data) {
        this.queue = data
      }
    },
    messageQueue () {
      return this.$store.getters.messageQueue
    },
    trackOneStyle () {
      return {
        transform: `translate(${this.trackOneCount}%, 0)`,
        background: 'transparent'
      }
    },
    trackTwoStyle () {
      return {
        transform: `translate(${this.trackTwoCount}%, 0)`,
        background: '#FFF'
      }
    }
  },
  watch: {
    queueData (newQueue) {
      if (newQueue.length === 0) {
        // 关了省电
        // this.stopRoll()
      } else {
        let queueModel = this.queueData.find(q => q.notRunning)
        if (!queueModel) return
        queueModel.notRunning = false
      }
    },
    messageQueue (queue) {
      // console.log(queue)
      if (this.$store.getters.messageQueue.length > 0) {
        // 有新弹幕
        // 判断自己是否能接收
        if (this.checkSelf()) {
          const message = this.$store.getters.messageQueue[0]
          console.log(message)
          this.$store.dispatch('shiftMessageQueue')
          this.model.setMessage(message)
        }
      }
    }
  },
  data () {
    return {
      rollingStyle: {
        left : window.innerWidth + 'px'
      },
      messageStyle: {
        fontSize: 15
      },
      trackOneCount: 100,
      trackTwoCount: 100,
      lastTime : 0,
      v: 0, // 速度
      frameId: 0
    }
  },
  mounted () {
    this.messageStyle = {
      fontSize: config.default_font_size + 'px'
    }

    this.v = window.innerWidth / config.default_time
    // this.frameId = this.track.addEventListener('FRAME_FIRE', (time) => {
    //   if (this.lastTime === 0) this.lastTime = time
    //   this.roll(time - this.lastTime)
    //   this.lastTime = time
    // })

    // this.track.addEventListener('REMOVE_QUEUE', (pkg) => {
    //   const ind = this.queueData.indexOf(pkg)
    //   if (ind >= 0) {
    //     this.queueData.splice(ind, 1)
    //   }
    // })

    // this.track.addEventListener('UPDATE_QUEUE', (pkgList) => {
    //   pkgList.forEach(pkg => {
    //     const ind = this.queueData.indexOf(pkg)
    //     this.$set(this.queueData, ind, pkg)
    //   })
    // })
    this.running()
    this.roll()
  },
  methods: {
    // 判断自己是否能接收
    checkSelf () {
      const usingPits = this.model.getUsageRate()
      console.log(usingPits)
      return usingPits < 0.8 // 保留20%空闲
    },
    running (time) {
      if (this.lastTime === 0) this.lastTime = time
      this.roll(time - this.lastTime)
      this.lastTime = time
      requestAnimationFrame(this.running)
    },
    roll (gapTime) {
      if (!gapTime || gapTime === 0) return
      if (this.trackOneCount <= -100) {
        this.trackOneCount = 100
      }
      if (this.trackTwoCount <= -200) {
        this.trackTwoCount = 0
      }
      
      let distance = gapTime * this.v * 60/ window.innerWidth
      this.trackOneCount -= distance //0.001667//distance//0.1667
      this.trackTwoCount -= distance //distance//0.1667

      this.model.updateTrackPits(0, this.trackOneCount)
      this.model.updateTrackPits(1, this.trackTwoCount)

      // window.requestAnimationFrame(this.roll)
    }
  }
}
</script>
<style lang="scss" scoped>
.vue-baberrage-lane {
  position: absolute;
  overflow: hidden;
  width: 100%;
  
  .vue-baberrage-lane-box {
    width: 200%;
    display: flex;

    .vue-baberrage-track {
      width: 50%; 
      background: #FFF;
      height: inherit;
      flex: 1;

      ul {
        padding: 0;
        margin: 0;
        height: inherit;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;

        li {
          flex: 1;
          flex-direction: row;
          height: inherit;
        }
      }
    }
  }

  .vue-baberrage-msg {
    position: absolute;
    height: 100%;
    width: auto;
    float:left;

    ul {
      padding: 0;
      margin: 0;
      list-style: none;

      li {
        float: left;
        margin-right:15px;
      }
    }

    ul:after {
      clear: both;
      content: ' ';
      display:table;
    }
  }
}
</style>