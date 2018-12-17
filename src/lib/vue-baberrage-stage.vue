<template>
  <div id="vue-baberrage-stage" 
       class="vue-baberrage-stage"
       :style="propStyle">
      <VueBaberrageLane 
        :ref="item.id" 
        :key="item.id" 
        :style="item.style"
        :queue="item.queue"
        v-for="item in lanesList"/>
  </div>
</template>
<script>
import config from '../config'
import VueBaberrage from './vue-baberrage'
import VueBaberrageLane from './vue-baberrage-lane'
import BarrageController from '../controllers/barrage.controller'
import MessageModel from '../models/message.model'
import LaneModel from '../models/lane.model'
import thrower from 'thrower'

const BaberrageConfig = {
  mode: VueBaberrage.LOCAL_MODE  
}

export default {
  name: 'VueBaberrageStage',
  props: ['width','height','mode','uri', 'lanes'],
  components: {
    VueBaberrageLane
  },
  data () {
    return {
      barrageController: null,
      data: [],
      lanesList: [],
      lanesCount: 0,
      propStyle: {
        width: (isNaN(this.width)? this.width :  `${this.width}px`) || '300px',
        height: (isNaN(this.height)? this.height :  `${this.height}px`) || '400px',
        background: 'rgb(120, 205, 255)'
      },
      mySubject: null,
    }
  },
  mounted () {
    if (this.mode && !(this.mode !== 'local' || this.mode !== 'remote')) {
      thrower.r('ParamInvaild','`mode` can only be `local` or `remote`.')
    }

    this.lanesCount = this.lanes || config.default_lane

    this.barrageController = BarrageController.getInstance()

    // Lane Amount
    this.laneInit()

    // bind lane queue
    this.barrageController.bindLane({ laneUIData: this.lanesList})
  },
  methods: {
    laneInit () {
      let height = config.default_message_height
      Array.from({ length: this.lanesCount }, (v, k) => {
        this.lanesList.push(new LaneModel({
          id: `lane_${k}`,
          queue: [],
          style: {
            top: k * height + 'px',
            left: 0,
            width: '100%',
            height: `${height}px`,
            lineHeight: `${height}px`,
            background: 'rgba(120, 205, 255,.5)',
            border: '1px dashed #FFF'
          }
        }))
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.vue-baberrage-stage {
  position: relative;
}
</style>