<template>
  <div class="tvList">
    <div v-for="(item, index) in tvList" class="item" :key="index">
      <div class="time">
        {{item.time}}
      </div>
      <div class="name">{{item.pName}}</div>
      <div class="playing"><i></i></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tvList',
  props: {
    tvList: {
      type: Array,
      default: []
    }
  },

  mounted () {
    console.log(this.tvList)
  }
}
</script>

<style scoped>
  .tvList{
    flex: 1;
    padding: 0 5px;
  }
  .tvList .item{
    display: flex;
    background: #f9f9f9;
    color: #707070;
    padding: 10px 5px;
    margin-bottom: 5px;
    font-size: 14px;
  }
  .tvList .item.active{
    color: #d81e06;
  }
  .tvList .item .time{
    width: 45px;
    border-right: solid 2px #ddd;
    text-align: center;
  }
  .tvList .item .name{
    padding: 0 5px;
    flex: 1;
  }
  .tvList .item .playing{
    width: 30px;
    display: none;
  }
  .tvList .item .playing i{
    width: 20px;
    height: 20px;
    background-image: url('https://static-public-1301949451.cos.ap-shanghai.myqcloud.com/my-tv/play.png');
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center center;
  }
  .tvList .item.active .playing{
    display: block;
  }
</style>
