<template>
  <!-- 加载更多 -->
  <div class="container" :class="type" v-infinite-scroll="loadBottomAjax" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
    <!-- 请求提示 -->
    <myLoading :visible="loading" :reload="init"></myLoading>
    <!-- 顶部提示 -->
    <div class="globalTip">
      <div class="dataCount">已为你推荐{{dataCount}}条新内容</div>
      <div class="noNewData">没有最新的内容了</div>
      <div class="requestFail">网络请求失败，请检查网络</div>
    </div>
    <!-- 下拉加载 -->
    <mt-loadmore :top-method="loadTopAjax" @top-status-change="handleTopChange" ref="loadmore" :auto-fill="false" :distance="indexSwiper">
      <!-- 下拉提示 -->
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus === 'pull'"><img class="pullLoading" src="../../../assets/img/loading.png" alt="">下拉刷新↓</span>
        <span v-show="topStatus === 'drop'"><img class="pullLoading" src="../../../assets/img/loading.png" alt="">释放更新↑</span>
        <span v-show="topStatus === 'loading'"><img class="pullLoading" src="../../../assets/img/loading.gif" alt="">加载中...</span>
      </div>
      <!-- 文章列表 -->
      <listItem :itemJson="contentJson" v-if="contentJson.length > 0"></listItem>
      <div class="bottomLoad" v-if="contentJson.length > 0">
        <div class="loading" v-show="bottomLoading">加载中...</div>
        <div class="noData" v-if="bottomNoData">没有更多的内容了</div>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  props: {
    type: String
  },
  data () {
    return {
      classPage: 1, // 当前栏目的翻页页数
      contentJson: [], // 整个列表数据
      dataCount: 0, // 推荐文章数量
      topStatus: '', // 下拉状态
      bottomLock: false, // 上滑开关
      bottomLoading: true, // 底部loading
      bottomNoData: false, // 底部nothing
      loading: false
    }
  },
  computed: {
    ...mapState('index', [
      'indexActive',
      'indexPage',
      'indexLocation',
      'indexSwiper'
    ]),
    ...mapGetters('index', [
      'activeMeta'
    ])
  },
  watch: {
    indexActive () {
      this.init()
    },
    classPage (val) {
      this.indexPage[this.indexActive] = val
      this.set_indexPage(this.indexPage)
    },
    contentJson (val) {
      this.set_currentContent(val)
    }
  },
  methods: {
    ...mapMutations('index', [
      'set_indexPage',
      'set_currentContent',
      'set_indexLocation'
    ]),
    ...mapActions('index', [
      'get_listItem_cache',
      'get_listItem_data'
    ]),
    init () {
      // active栏目第一次请求数据
      if (this.indexActive === this.type && this.contentJson.length === 0) {
        this.loading = 'loading'
        this.classPage = this.activeMeta.page
        // 获取缓存的栏目数据 ? 缓存 : 发送请求
        this.get_listItem_cache(this.indexActive)
          .then(res => {
            if (res) {
              console.log(res)
              this.contentJson = res
              this.handleLocation('get')
              this.loading = false
            } else {
              this.loadTopAjax()
            }
          })
      }
    },
    // 顶部下拉刷新
    loadTopAjax () {
      this.get_listItem_data(this.classPage)
        .then(res => {
          this.loading = false
          if (res) {
            this.contentJson.unshift(...res)
            this.dataCount = res.length
            this.classPage++
            // 文章数量提示
            $(`.container.${this.type} .dataCount`).slideDown(200).delay(1000).slideUp(200)
          } else {
            // 没有文章数据提示
            $(`.container.${this.type} .noNewData`).slideDown(200).delay(1000).slideUp(200)
          }
          this.$refs.loadmore.onTopLoaded() // mint-ui 下拉组件的方法
          $(`.container.${this.type} .requestFail`).hide()
        })
        .catch(err => {
          console.log(err)
          if (this.contentJson.length > 0) {
            $(`.container.${this.type} .requestFail`).show()
            this.loading = false
          } else {
            this.loading = 'error'
          }
        })
    },
    // 底部上滑请求
    loadBottomAjax () {
      this.bottomLock = true // 上滑开关
      this.get_listItem_data(this.classPage)
        .then(res => {
          if (res) {
            this.contentJson.push(...res)
            this.classPage++
          } else {
            this.bottomLoading = false
            this.bottomNoData = true
          }
          this.bottomLock = false
        })
    },
    // mint-ui 下拉组件的状态
    handleTopChange (status) {
      this.topStatus = status
    },
    // 处理滚动条位置对的方法
    handleLocation (type) {
      if (this.indexActive === this.type) {
        if (type === 'get') {
          this.$nextTick(() => {
            $(`.container.${this.type}`).scrollTop(this.activeMeta.location)
          })
        } else if (type === 'set') {
          let scrollTop = $(`.container.${this.type}`).scrollTop()
          if (scrollTop >= 0) {
            this.indexLocation[this.indexActive] = scrollTop
            this.set_indexLocation(this.indexLocation)
          }
        }
      }
    },
    saveScroll () {
      this.handleLocation('set')
    }
  },
  mounted () {
    this.init()
  },
  // keep-alive激活时调用
  activated () {
    this.handleLocation('get')
    window.addEventListener('beforeunload', this.saveScroll) // 刷新之后保持当前滚动位置，监听方法不能带参数
  },
  // keep-alive停用时调用
  deactivated () {
    this.handleLocation('set')
    window.removeEventListener('beforeunload', this.saveScroll) // 刷新之后保持当前滚动位置，监听方法不能带参数
  }
}
</script>

<style lang="stylus">
.container{
  position: relative;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .globalTip{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    div{
      display: none;
      height: 32px;
      background: rgba(213, 233, 247, .9);
      line-height: 34px;
      text-align: center;
      font-size: 14px;
      color: #2a90d7;
      &.requestFail{
        color: #f56767;
        background: #fbe9ef;
      }
    }
  }
}
.mint-loadmore-top{
  font-size: 14px;
}
.pullLoading{
  margin-top: -2px;
  margin-right: 5px;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}
.bottomLoad{
  position: relative;
  width: 100%;
}
.bottomLoad div{
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
  color: #999;
}
</style>
