<template>
  <div id="detail">
    <myHeader fixed :title="title" v-goTop:click="true">
      <a slot="left" class="back-black" @click.stop="$router.go(-1)"></a>
      <a slot="right" class="menu" @click.stop="$refs.share.toggle()"></a>
    </myHeader>
    <div class="content">
      <div class="container" v-slide:slideRight="true">
        <!-- 正文 -->
        <myArticle v-if="articleJson" :json="articleJson"></myArticle>
        <!-- 标签 -->
        <myTags v-if="articleJson.infotags" :json="articleJson.infotags"></myTags>
        <!-- 热点评论 -->
        <template v-if="articleJson.comment">
          <!-- 分割线 -->
          <div class="bg_line"></div>
          <div class="comment-hot">
            <div class="comment_title">
              <div class="Line">
                <div class="title">用户热评</div>
              </div>
            </div>
            <commentItem v-for="(item, index) in articleJson.comment" :key="index" :itemJson="item"></commentItem>
            <a href="http://www.baidu.com" class="comment_more" v-if="articleJson.plnum > 0">下载健康头条阅读全部{{articleJson.plnum}}条评论</a>
          </div>
        </template>
        <!-- 分割线 -->
        <div class="bg_line"></div>
        <!-- 推荐 -->
        <div id="recommend" v-if="articleJson.recommend">
          <div class="comment_title">
            <div class="Line">
              <div class="title">相关推荐</div>
            </div>
          </div>
          <listItem :itemJson="articleJson.recommend"></listItem>
        </div>
        <a href="http://www.baidu.com" class="downLoad">了解更多，去百度吧~~~</a>
      </div>
    </div>
    <!-- 分享组件 -->
    <myShare ref="share"></myShare>
    <!-- 请求提示 -->
    <myLoading :visible="loading" :reload="init"></myLoading>
  </div>
</template>

<script>
import myArticle from './components/article'
import myTags from './components/tags'
import myShare from './components/share'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'detail',
  data () {
    return {
      title: '健康头条', // header的title
      id: '', // 文章id
      classid: '', // 文章分类classid
      datafrom: '', // 数据来源
      articleJson: {}, // 文章数据
      loading: 'loading',
      error: false
    }
  },
  components: { myArticle, myTags, myShare },
  computed: {
    ...mapState('index', [
      'indexColumn'
    ]),
    ...mapState('detail', [
      'location'
    ])
  },
  watch: {
    $route (val) {
      if (val.query.id) {
        this.init() // 初始化
      }
    }
  },
  methods: {
    ...mapMutations('detail', [
      'set_location'
    ]),
    ...mapActions('index', [
      'get_indexColumn_data'
    ]),
    ...mapActions('detail', [
      'get_Article_data'
    ]),
    async init () {
      this.classid = this.$route.query.classid
      this.id = this.$route.query.id
      this.datafrom = this.$route.query.datafrom
      $('#detail .container').scrollTop(0)
      await this.handleTitle()
      this.get_Article()
      this.visitCollect()
    },
    // 获取title分类
    async handleTitle () {
      if (this.indexColumn.length <= 1) {
        await this.get_indexColumn_data()
      }
      let index = this.indexColumn.findIndex(n => n.classid === this.classid)
      if (index > -1) {
        this.title = `健康头条 · ${this.indexColumn[index].classname}`
      }
    },
    // 获取文章数据
    get_Article () {
      this.loading = 'loading'
      let params = {
        'id': this.id,
        'datafrom': this.datafrom
      }
      this.get_Article_data(params)
        .then(res => {
          if (res) {
            this.articleJson = res
            this.handleLocation('get')
          }
          this.loading = false
        })
        .catch(err => {
          this.loading = 'error'
          console.log(err)
        })
    },
    // 数据统计
    visitCollect () {
      $.ajax({
        url: `http://api.toutiaojk.com/public/ViewClick/?classid=${this.classid}&id=${this.id}&addclick=1`,
        type: 'GET'
      })
    },
    // 记录位置
    handleLocation (type) {
      if (type === 'get') {
        this.$nextTick(() => {
          if (this.location && this.location[this.id]) {
            $('#detail .container').scrollTop(this.location[this.id])
          }
        })
      } else if (type === 'set') {
        this.location[this.id] = $('#detail .container').scrollTop()
        this.set_location(this.location)
      }
    }
  },
  mounted () {
    this.init()
  },
  beforeRouteLeave (to, from, next) {
    this.handleLocation('set')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    this.handleLocation('set')
    next()
  }
}
</script>

<style lang="stylus">
#detail{
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  font-size: 16px;
  overflow: hidden;
  header{
    background: #fff;
    color: #333;
    font-size: 16px;
    .menu{
      background: url(../../assets/img/menu.png) no-repeat center;
      background-size: 20px;
    }
  }
  .content{
    padding-top: .5rem;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .container{
    position: relative;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .downLoad{
    display: block;
    width: 100%;
    height: 36px;
    background: #00939c;
    line-height: 36px;
    text-align: center;
    color: #fff;
    font-size: 14px;
  }
  .comment-hot{
    padding: .2rem 0 0;
    background: #f9f9f9;
    .comment_more{
      padding: .2rem 0;
      display: block;
      text-align: center;
      font-size: 12px;
      color: #00939c;
    }
  }
  .comment_title{
    margin-bottom: .15rem;
    position: relative;
    .Line{
      position: relative;
      margin: 0 auto;
      width: 1.2rem;
      text-align: center;
      &:before{
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
        width: .26rem;
        border-top: 1px solid #ccc;
      }
      &:after{
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        right: 0;
        width: .26rem;
        border-top: 1px solid #ccc;
      }
      .title{
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .bg_line{
    height: 5px;
    background: #eee;
  }
  #recommend{
    position: relative;
    padding-top: .2rem;
  }
}
</style>
