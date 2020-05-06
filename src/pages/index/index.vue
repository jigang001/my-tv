<template>
  <div class="container">
    <channel :channelList="channelList" :defaultChannel="currentChannel" @changeChannel="getTVlist"></channel>
    <tvList v-if="refreshTVlist" :tvList="tvList"></tvList>
  </div>
</template>

<script>
import channel from '@/components/channel'
import tvList from '@/components/tvList'
export default {
  components: {
    channel,
    tvList
  },
  data () {
    return {
      channelList: [],
      currentChannel: '',
      tvList: [],
      refreshTVlist: false
    }
  },

  methods: {
    getChannelList () {
      this.$httpWX.post({
        url: 'https://api.avatardata.cn/TVTime/LookUp?key=04586d229307477aa96526f6e53cd1bb&pId=1'
      }).then(res => {
        console.log(res)
        if (res.result && res.result.length > 0) {
          this.channelList = res.result
          this.currentChannel = res.result[0].rel
        }
      }).catch(err => {
        console.log(err)
      })
    },

    getTVlist (rel) {
      console.log(rel)
      this.refreshTVlist = false
      this.$httpWX.post({
        url: 'https://api.avatardata.cn/TVTime/TVlist?key=04586d229307477aa96526f6e53cd1bb&code=' + rel
      }).then(res => {
        console.log(res)
        if (res.result && res.result.length > 0) {
          for (let item of res.result) {
            item.time = item.time.split(' ')[1]
          }
          this.tvList = res.result
          this.refreshTVlist = true
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },

  created () {
    // let app = getApp()
  },

  onShow () {
    this.getChannelList()
  }
}
</script>

<style scoped>

</style>
