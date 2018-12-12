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
    this.$babePushListAndPlay({messageList : [
      {
        id: this.id++,
        user: this.id,
        display_time: 5000, // 显示时间 ms
        content: 'aaaaa' + this.id
      },
      {
        id: this.id++,
        user: this.id,
        display_time: 8000, // 显示时间 ms
        content: 'bbbbbb' + this.id
      },
      {
        id: this.id++,
        user: this.id,
        display_time: 8000, // 显示时间 ms
        content: 'ccccc' + this.id
      },
      {
        id: this.id++,
        user: this.id,
        display_time: 9000, // 显示时间 ms
        content: 'ddddd' + this.id
      },
    ]
    }
    )
  },
  methods: {
    add () {
      this.$babePush({ message: {
        id: this.id++,
        user: this.id,
        display_time: 5000, // 显示时间 ms
        content: 'heyhey' + this.id
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
