<template>
  <div class="vue-baberrage">
    Smimmgmgmgmgmg~
  </div>
</template>
<script>
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
    }
  },
  data () {
    return {
      
    }
  }
}
</script>
<style lang="scss" scoped>
.vue-baberrage {
  position: absolute;
}
</style>