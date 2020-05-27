<template>
  <div class="container">
    <channel :channelList="channelList" :defaultChannel="currentChannel" @changeChannel="getTVlist"></channel>
    <tvList v-if="refreshTVlist" :tvList="tvList" :currentPlay="currentPlay"></tvList>
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

  computed: {
    currentPlay () {
      let nowStamp = Date.parse(new Date())
      let currentItem = ''
      for (let i = 0; i < this.tvList.length; i++) {
        let itemStamp = this.tvList[i].timeStamp
        if (nowStamp >= itemStamp) {
          currentItem = itemStamp
        }
      }
      return 'c' + currentItem
    }
  },

  methods: {
    getChannelList () {
      this.$httpWX.get({
        url: this.$store.state.host + '/myTV/TVTime/LookUp?pId=1'
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
      this.$httpWX.get({
        url: this.$store.state.host + '/myTV/TVTime/TVlist?code=' + rel
      }).then(res => {
        console.log(res)
        if (res.result && res.result.length > 0) {
          for (let item of res.result) {
            item.timeStamp = Date.parse(item.time)
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

  onLoad () {
    const vm = this
    wx.login({
      success (res) {
        console.log(res)
        if (res.code) {
          // 发起网络请求
          vm.$httpWX.get({
            url: 'https://api.jungkisong.cn/myTV/users',
            data: {
              code: res.code
            }
          }).then(result => {
            console.log(result)
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  onShow () {
    this.getChannelList()
  },

  onShareAppMessage (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    } else {
      // 来自菜单栏转发按钮
      console.log(res.target)
    }
    return {
      title: '在家很无聊？来看看现在电视里放点什么节目吧',
      path: '/pages/index/main',
      // 设置转发的图片
      imageUrl: 'https://static-public-1301949451.cos.ap-shanghai.myqcloud.com/my-tv/share.jpg',
      // 成功的回调
      success: (res) => {},
      // 失败的回调
      fail: (res) => {},
      // 无论成功与否的回调
      complete: (res) => {}
    }
  }
}
</script>

<style scoped>

</style>
