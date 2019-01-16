<template>
  <div id="vue-baberrage-stage" 
       class="vue-baberrage-stage"
       :style="propStyle">
      <VueBaberrageLane 
        :ref="item.id" 
        :key="item.id" 
        :model="item"
        :style="item.style"
        :queue="item.queue"
        v-for="item in lanesList"/>
  </div>
</template>
<script>
import config from '../config'
import VueBaberrageLane from './vue-baberrage-lane'
import BarrageController from '../controllers/barrage.controller'
import LaneModel from '../models/lane.model'
import thrower from 'thrower'

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
    this.barrageController.setEnv(this)

    // Lane Amount
    this.laneInit()

    // bind lane queue
    this.barrageController.bindLane({ laneUIData: this.lanesList})
  },
  methods: {
    laneInit () {
      let height = config.default_message_height
      // Adding Lane model
      Array.from({ length: this.lanesCount }, (v, k) => {
        this.lanesList.push(new LaneModel({
          id: `lane_${k}`,
          queue: [],
          poolWidth: document.getElementById('vue-baberrage-stage').offsetWidth,
          style: {
            top: k * height + 'px',
            left: 0,
            // width: '100%',
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