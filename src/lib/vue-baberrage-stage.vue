<template>
  <div id="vue-baberrage-stage" 
       class="vue-baberrage-stage"
       :style="propStyle">
      <VueBaberrageLane :ref="`lane_${n}`" :key="n" v-for="n in +lanes"/>
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
  props: ['width','height','mode','uri'],
  components: {
    VueBaberrageLane
  },
  data () {
    return {
      barrageService: null,
      data: [],
      lanes: 0,
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

    const barrageConfig = {
      mode: this.mode === 'remote' ? VueBaberrage.REMOTE_MODE : VueBaberrage.LOCAL_MODE,
      uri: this.uri || '',
      lanes: this.lanes || config.default_lane
    }

    this.barrageService = new BarrageService(barrageConfig)

    // Lane Amount
    this.lanes = barrageConfig.lanes

    this.$babe_set_current_service(this.barrageService)
    // MessageModel.fieldMapping = {type:'message', config: {user:'haha'}}
    // let msg = new MessageModel({user:'baby',content:'hello'})
    // console.log(MessageModel.fieldMapping)
  },
  methods: {

  }
}
</script>
<style lang="scss">
</style>