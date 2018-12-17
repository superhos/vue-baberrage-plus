<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <VueBaberrageStage 
      width="100%" 
      height="500" 
      mode="local"/>
      <button @click="add">Add</button>
      <button @click="play">Play</button>
      <button @click="pause">Pause</button>
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
    const mock = Array.from({length: 500}, (v, i) => {
        return {
              id: ++i,
              user: i,
              display_time: 1000 + i * 1000, // 显示时间 ms
              content: 'aaaaa' + i
            }
      })
    this.$Baberrage.pushList({messageList : mock })
  },
  methods: {
    add () {
      this.$Baberrage.push({ message: {
        id: this.id++,
        user: this.id,
        display_time: 5000, // 显示时间 ms
        content: 'heyhey' + this.id
      }})
    },
    play () {
      this.$Baberrage.play()
    },
    pause () {
      this.$Baberrage.pause()
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
