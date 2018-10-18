<template>
  <article id="article">
    <div class="article_info">
      <h1 class="title">{{json.title}}</h1>
      <span class="befrom">{{json.befrom}}</span>
      <span class="newstime">{{json.newstime}}</span>
    </div>
    <!-- 视频 -->
    <template v-if="json.playonlineurl">
      <div class="article_video">
        <div class="video" :class="{'video-fixed': video_fixed}">
          <template v-if="video_poster">
            <div class="video_info">
              <img :src="json.titlepic">
            </div>
            <div class="playRound" @click.stop="videoPlay">
              <div class="playSan"></div>
            </div>
          </template>
          <template v-if="video_ended">
            <div class="video_info">
              <img :src="json.titlepic">
            </div>
            <div class="repeat">
              <div class="repeat_round" @click.stop="videoPlay"></div>
              <p class="repeat_text">重播</p>
            </div>
            <div class="black"></div>
          </template>
          <div class="loading" v-show="video_loading">
            <mt-spinner :type="0" :size="50"></mt-spinner>
          </div>
          <div class="video_box">
            <video ref="video" :controls="!video_poster" :key="json.playonlineurl">
              <source :src="json.playonlineurl" type="video/mp4">
            </video>
          </div>
        </div>
      </div>
    </template>
    <!-- 文字 & 图片 -->
    <template v-else>
      <section class="article_content">
        <div class="content_html" v-html="json.newstext" :class="{'content_html-close': content_more}"></div>
        <div class="content_moreBtn" v-if="content_more" @click.stop="content_more = false">展开全文...</div>
      </section>
    </template>
  </article>
</template>

<script>
export default {
  props: {
    json: Object
  },
  data () {
    return {
      video: '', // video元素
      video_poster: true, // video封面
      video_playing: false, // video是否播放
      video_ended: false, // 播放是否结束
      video_loading: false, // 是否正在缓存
      video_fixed: false, // 是否悬浮
      content_more: false
    }
  },
  watch: {
    json (val) {
      this.shrikArticle()
      this.video = this.$el.querySelector('video')
      this.video_poster = true
      this.video_playing = false
      this.video_ended = false
      this.video_loading = false
      this.video_fixed = false
    }
  },
  methods: {
    videoPlay () {
      this.video = this.$el.querySelector('video')
      this.video.play()
      this.videoEvent()
      this.videoFixed()
    },
    videoEvent () {
      // 播放
      this.video.onplay = () => {
        this.video_playing = true
        this.video_poster = false
        this.video_ended = false
      }
      // 暂停
      this.video.onpause = () => {
        this.video_playing = false
        this.video_loading = false
      }
      // 等待
      this.video.onwaiting = () => {
        this.video_loading = true
      }
      // 可以播放
      this.video.oncanplay = () => {
        this.video_loading = false
      }
      // 结束
      this.video.onended = () => {
        this.video_ended = true
      }
    },
    videoFixed () {
      let videoTop = $('.video').position().top // video相对于屏幕上方的距离
      $('#detail .container').on('scroll', (event) => {
        event.preventDefault()
        // 滚动到video && video正在播放
        if ($('#detail .container').scrollTop() >= videoTop) {
          this.video_fixed = true
        } else {
          this.video_fixed = false
        }
      })
    },
    // 是否显示查看全文
    shrikArticle () {
      if (this.json.newstext && this.json.newstext.length >= 1500) {
        this.content_more = true
      } else {
        this.content_more = false
      }
    },
    backTo () {
      document.addEventListener('pause', () => {
        this.video.pause()
      }, false)
    }
  },
  mounted () {
    this.backTo()
  }
}
</script>

<style lang="stylus">
#article{
  width: 100%;
  position: relative;
  .article_info {
    padding: 0 0 .16rem .16rem;
    background: #fff;
    overflow: hidden;
    font-size: 12px;
    border-bottom: 1px solid #eee;
    .title{
      padding: .15rem 0;
      color: #111;
      font-weight: bold;
      font-size: 20px;
    }
    .befrom{
      margin-right: 5px;
    }
  }
  .article_video{
    margin-bottom: 40px;
    width: 100%;
    .video{
      position: relative;
      width: 100%;
      height: 2rem;
      overflow: hidden;
    }
    .video-fixed{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }
    .video_info{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 111;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .playRound {
      position: absolute;
      width: 48px;
      height: 48px;
      left: 50%;
      top: 50%;
      margin-left: -24px;
      margin-top: -24px;
      border-radius: 50%;
      background: rgba(0, 0, 0, .3);
      z-index: 333;
      border: 1px solid #eee;
      .playSan {
        position: absolute;
        width: 0;
        height: 0;
        font-size: 0;
        border-width: 16px;
        border-style: solid;
        border-color: transparent transparent transparent rgba(255, 255, 255, .6);
        left: 50%;
        top: 50%;
        margin-left: -5px;
        margin-top: -16px;
      }
    }
    .loading {
      position: absolute;
      width: 50px;
      height: 50px;
      left: 50%;
      top: 50%;
      margin-left: -25px;
      margin-top: -25px;
      z-index: 222;
    }
    .repeat {
      position: absolute;
      width: 44px;
      height: 44px;
      left: 50%;
      top: 50%;
      margin-left: -22px;
      margin-top: -22px;
      border-radius: 50%;
      z-index: 444;
      background: #f8f8f8;
      .repeat_round {
        width: 44px;
        height: 44px;
        background: url(../../../assets/img/repeat.png) no-repeat center center;
        background-size: 28px;
      }
      .repeat_text {
        font-size: 12px;
        color: #fff;
        text-align: center;
        margin-top: 4px;
      }
    }
    .black {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      z-index: 333;
      height: 2rem;
      background: rgba(0, 0, 0, .3);
    }
    .video_box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      text-align: center;
      height: 2rem;
      video {
        width: 100%;
      }
    }
  }
  .article_content{
    position: relative;
    padding: .15rem .16rem;
    line-height: 26px;
    color: #333;
    font-size: 16px;
    .content_html {
      overflow: hidden;
      &.content_html-close{
        height: 1200px;
      }
      img{
        width: 100%;
        height: auto;
      }
      div, p{
        padding-bottom: 10px;
      }
    }
    .content_moreBtn{
      margin-top: 15px;
      padding: 5px 0;
      text-align: center;
      font-size: 14px;
      color: #00939c;
    }
  }
}
</style>
