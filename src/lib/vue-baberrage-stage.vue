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
import BarrageService from '../services/barrage.service'
import MessageModel from '../models/message.model'
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
      barrageService: null,
      data: [],
      lanesList: [],
      lanesCount: 0,
      propStyle: {
        width: (isNaN(this.width)? this.width :  `${this.width}px`) || '300px',
        height: (isNaN(this.height)? this.height :  `${this.height}px`) || '400px',
        background: '#CCC'
      },
      mySubject: null,
    }
  },
  mounted () {
    if (this.mode && !(this.mode !== 'local' || this.mode !== 'remote')) {
      thrower.r('ParamInvaild','`mode` can only be `local` or `remote`.')
    }

    this.lanesCount = this.lanes || config.default_lane

    const barrageConfig = {
      mode: this.mode === 'remote' ? VueBaberrage.REMOTE_MODE : VueBaberrage.LOCAL_MODE,
      uri: this.uri || '',
      lanes: this.lanesCount
    }

    this.barrageService = new BarrageService(barrageConfig)

    // Lane Amount
    this.laneInit()

    this.$babe_set_current_service(this.barrageService)

    // bind lane queue
    this.barrageService.bindLane({ laneUIData: this.lanesList})
  },
  methods: {
    laneInit () {
      let height = config.default_message_height
      Array.from({ length: this.lanesCount }, (v, k) => {
        this.lanesList.push({
          id: `lane_${k}`,
          queue: [],
          style: {
            top: k * height + 'px',
            left: 0,
            width: '100%',
            height: `${height}px`,
            lineHeight: `${height}px`,
            background: '#999'
          }
        })
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