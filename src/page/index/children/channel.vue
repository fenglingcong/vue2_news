<template>
  <transition name="fadeIn">
    <div id="channel">
      <myHeader fixed title="频道管理">
        <a class="back-white" slot="left" @click="$router.go(-1)"></a>
      </myHeader>
      <div class="content">
        <div class="container">
          <!-- 我的频道 -->
          <section class="column">
            <p class="title">我的频道</p>
            <ul>
              <li v-for="(item, index) in indexColumn" :key="index" @click="remove(item, index)">
                <a href="JavaScript:;" :class="item.classpath">{{item.classname}}</a>
              </li>
            </ul>
          </section>
          <!-- 未添加频道 -->
          <section class="column">
            <p class="title">点击添加频道</p>
            <ul>
              <li v-for="(item, index) in toAddChannel" :key="index" @click="add(index)">
                <a href="JavaScript:;">{{item.classname}}</a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import cache from '@/utils/cache'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      myChannel: [], // 我的频道
      toAddChannel: [], // 未添加频道
      channel: [
        {classname: 'Test20', classid: 20, classpath: 't1'},
        {classname: 'Test21', classid: 21, classpath: 't2'},
        {classname: 'Test22', classid: 22, classpath: 't3'},
        {classname: 'Test23', classid: 23, classpath: 't4'},
        {classname: 'Test24', classid: 24, classpath: 't5'},
        {classname: 'Test25', classid: 25, classpath: 't6'}
      ] // 模拟数据
    }
  },
  computed: {
    ...mapState('index', [
      'indexPage',
      'indexLocation',
      'indexColumn'
    ])
  },
  created () {
    this.toAddChannel = this.channel // 模拟可添加栏目数据
  },
  watch: {
    indexColumn () {
      this.set_indexColumn(this.indexColumn)
      this.set_indexActive('news_recommend')
    },
    toAddChannel () {
      cache.setSession('toAddChannel', this.toAddChannel)
    }
  },
  methods: {
    ...mapMutations('index', [
      'set_indexActive',
      'set_indexPage',
      'set_indexLocation',
      'set_indexColumn'
    ]),
    ...mapActions('index', [
      'get_channel_data'
    ]),
    // 获取可以添加的频道数据
    get_channel () {
      this.get_channel_data()
        .then(res => {
          if (res) {
            this.toAddChannel = res
          }
        })
    },
    // 获取可添加频道
    get_toAddChannel () {
      let toAddChannel = JSON.parse(cache.getSession('toAddChannel'))
      if (toAddChannel) {
        this.toAddChannel = toAddChannel
      }
    },
    // 添加频道
    add (index) {
      let addEle = this.toAddChannel.splice(index, 1)
      this.indexColumn.push(...addEle)
    },
    // 移除频道
    remove (item, index) {
      if (item.classpath !== 'news_recommend') {
        let removeEle = this.indexColumn.splice(index, 1)
        this.toAddChannel.push(...removeEle)
      }
    },
    // 增减栏目之后，同步page、location对象
    sync () {
      let pageObj = {}
      let locationObj = {}
      for (let i = 0; i < this.indexColumn.length; i++) {
        var classname = this.indexColumn[i].classpath
        if (this.indexPage[classname] > 1) {
          pageObj[classname] = this.indexPage[classname]
        } else {
          pageObj[classname] = 1
        }
        if (this.indexLocation[classname] > 0) {
          locationObj[classname] = this.indexLocation[classname]
        } else {
          locationObj[classname] = 0
        }
      }
      this.set_indexPage(pageObj)
      this.set_indexLocation(locationObj)
    }
  },
  mounted () {
    // this.get_channel() 获取真实可添加栏目数据
    this.get_toAddChannel()
  },
  deactivated () {
    this.sync()
  }
}
</script>

<style lang="stylus">
#channel{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 100%;
  overflow: hidden;
  .content{
    position: relative;
    padding-top: .5rem;
    height: 100%;
    background-color: #f8f8f8;
    .container{
      height: 100%;
      overflow: auto;
    }
  }
  .column{
    margin-top: 10px;
    .title{
      padding: 0 .15rem;
      background: #f5f5f5;
      line-height: .2rem;
      font-size: 12px;
      color: #666;
    }
    ul{
      margin-top: .1rem;
      font-size: 0;
      li{
        margin-bottom: .1rem;
        display: inline-block;
        width: 25%;
        line-height: 0;
        animation: zoomIn .3s ease;
        a{
          display: block;
          margin: 0 10px;
          border: 1px solid #ccc;
          text-align: center;
          line-height: 32px;
          font-size: 16px;
          color: #333;
          &.news_recommend{
            background-color: #f0f0f0;
          }
        }
      }
    }
  }
}
@keyframes zoomIn{
  0% {
    opacity: 0;
    transform: scale3d(.3, .3, .3)
  }
  50% {
    opacity: 1;
  }
}
</style>
