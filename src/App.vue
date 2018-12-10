<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <VueBaberrageStage width="100%" height="500" />
  </div>
</template>

<script>
import { VueBaberrage, VueBaberrageStage } from './lib/vue-baberrage-plus'

export default {
  name: 'app',
  components: {
    VueBaberrageStage
  },
  data () {
    return {
      datas: [1,2,3]
    }
  },
  mounted () {
    VueBaberrageStage.setConfig({
      mode: VueBaberrage.LOCAL_MODE,
      data: this.datas
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
