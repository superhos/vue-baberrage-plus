<template>
  <div class="vue-baberrage-lane">
    <div class="vue-baberrage-lane-box">
      <!-- 三轨道循环 -->
      <div class="vue-baberrage-track" :style="trackOneStyle">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="vue-baberrage-track" :style="trackTwoStyle">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <!-- <div class="vue-baberrage-track">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul> -->
      <!-- </div> -->
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
import TrackService from '../services/track.service'
import _ from 'lodash'
import config from '../config'
import { setTimeout } from 'timers';

export default {
  props: ['queue'],
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
    trackOneStyle () {
      return {
        transform: `translate(${this.trackOneCount}%, 0)`,
        background: '#bbdd00'
      }
    },
    trackTwoStyle () {
      return {
        transform: `translate(${this.trackTwoCount}%, 0)`,
        background: '#000'
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
        this.track.addPackage(queueModel)
        queueModel.notRunning = false
      }
    }
  },
  data () {
    return {
      rollingStyle: {
        left : window.innerWidth + 'px'
      },
      track: new TrackService(),
      messageStyle: {
        fontSize: 15
      },
      trackOneCount: 100,
      trackTwoCount: 100,
      lastTime : 0,
    }
  },
  mounted () {
    this.messageStyle = {
      fontSize: config.default_font_size + 'px'
    }

    this.track.start()
    this.track.addEventListener('FRAME_FIRE', (time) => {
      this.roll(time)
    })

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

    this.roll()
  },
  methods: {
    roll (time) {
      if (this.trackOneCount <= -100) {
        this.trackOneCount = 100
      }
      if (this.trackTwoCount <= -200) {
        this.trackTwoCount = 0
      }
      
      this.trackOneCount -= 0.01667//distance//0.1667
      this.trackTwoCount -= 0.01667//distance//0.1667
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