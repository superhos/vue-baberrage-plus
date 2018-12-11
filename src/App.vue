<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <VueBaberrageStage 
      width="100%" 
      height="500" 
      mode="local"/>
      <button @click="add">Add</button>
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
      id: 1,
      datas: [1,2,3]
    }
  },
  mounted () {
  },
  methods: {
    add () {
      this.$babe_push({ message: {
        user: this.id++,
        content: 'heyhey'
      }})
    }
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
