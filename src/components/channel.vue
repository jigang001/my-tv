<template>
  <div class="channel">
    <scroll-view scroll-y="true" style="height: 100%;">
      <div v-for="(item, index) in channelList" class="item" :class="{active: item.rel === currentChannel}" @click="changeChannel(item.rel)" :key="index">{{item.channelName}}</div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  name: 'channel',
  props: {
    channelList: {
      type: Array,
      default: []
    }
  },

  data () {
    return {
      currentChannel: ''
    }
  },

  computed: {
    defaultChannel () {
      if (this.channelList.length > 0) {
        return this.channelList[0].rel
      } else {
        return ''
      }
    }
  },

  watch: {
    defaultChannel (rel) {
      console.log(rel)
      this.currentChannel = rel
    },
    currentChannel (rel) {
      this.$emit('changeChannel', rel)
    }
  },

  methods: {
    changeChannel (rel) {
      this.currentChannel = rel
    }
  },

  mounted () {
  }
}
</script>

<style scoped>
  .channel{
    width: 100px;
    height: 100vh;
    background: #f9f9f9;
    overflow: hidden;
  }
  .channel .item{
    min-height: 20px;
    border-left: solid 3px #f9f9f9;
    padding: 15px 5px;
    color: #707070;
    background: #f9f9f9;
    font-size: 14px;
  }
  .channel .item.active{
    border-color: #d81e06;
    color: #d81e06;
  }
</style>
