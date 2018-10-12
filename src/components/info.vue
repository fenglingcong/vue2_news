<template>
  <div class="news_info">
    <span class="news_label blue" v-if="json.playonlineurl">视频</span>
    <span class="news_label blue" v-else-if="json.isgood >= 6">荐</span>
    <span class="news_label red" v-else-if="json.firsttitle >= 6">热</span>
    <span class="news_from" v-if="json.befrom">{{json.befrom}}</span>
    <span class="news_click" v-if="json.onclick">{{json.onclick | watchFilter}}阅读</span>
    <span class="news_plnum" v-if="json.plnum">{{json.plnum}}</span>
    <span class="news_time" v-if="json.time">{{json.time}}</span>
    <span class="news_tag" v-if="json.nlist">{{json.nlist}}</span>
  </div>
</template>

<script>
export default {
  props: {
    json: Object
  },
  filters: {
    watchFilter (val) {
      let randomVal = Math.floor(Math.random() * 101 + 100)
      if (val) {
        return randomVal + parseInt(val)
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="stylus">
.news_info{
  position: relative;
  margin-top: 6px;
  left: -12.5%;
  width: 125%;
  white-space: normal;
  color: #999;
  font-size: x-small;
  overflow: hidden;
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
  span{
    display: inline-block;
    vertical-align: middle;
  }
  .news_label{
    padding: 0 2px 1px;
    border-radius: 2px;
  }
  .blue{
    color: #fff;
    background: #00939c;
  }
  .red{
    color: #fff;
    background: #f85959;
  }
}
</style>
