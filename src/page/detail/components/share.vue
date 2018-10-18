<template>
  <div id="share">
    <popupMenu v-model="contentFrame">
      <div class="share_container">
        <span class="shareItem">
          <img src="~@/assets/img/wx_friend.png" @click="shareItemClick" alt="">
          <label>微信好友</label>
        </span>
        <span class="shareItem">
          <img src="~@/assets/img/wx_pyq.png" @click="shareItemClick" alt="">
          <label>微信朋友圈</label>
        </span>
        <span class="shareItem">
          <img src="~@/assets/img/qq.png" @click="shareItemClick" alt="">
          <label>QQ好友</label>
        </span>
        <span class="shareItem">
          <img src="~@/assets/img/qzone.png" @click="shareItemClick" alt="">
          <label>QQ空间</label>
        </span>
      </div>
    </popupMenu>
    <popupMenu v-model="shareFrame">
      <div class="share_box">
        <p class="share_tip">长按复制下方链接，去粘贴给好友吧</p>
        <p class="share_url">{{shareUrl}}</p>
      </div>
    </popupMenu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contentFrame: false, // 内容模态框
      shareFrame: false, // 分享模态框
      shareUrl: window.location.href // 分享链接
    }
  },
  methods: {
    shareItemClick () {
      this.contentFrame = false
      this.shareFrame = true
    },
    // 父组件调用
    toggle () {
      this.contentFrame = !this.contentFrame
    }
  }
}
</script>

<style lang="stylus">
#share{
  .share_container{
    padding: 20px 10px;
    display: flex;
    width: 100%;
    text-align: center;
    overflow: auto;
    .shareItem{
      flex: 1;
      margin: 0 5px;
      min-width: 60px;
      img{
        width: 40px;
        height: 40px;
      }
      label{
        margin-top: 8px;
        display: block;
        font-size: 12px;
      }
    }
  }
  .share_box{
    padding: 15px 20px;
    .share_tip{
      padding: 0 10px;
      font-size: 16px;
    }
    .share_url{
      margin-top: 10px;
      padding: 10px;
      border: 1px solid rgb(217, 217, 217);
      font-size: 14px;
      text-align: left;
      word-break: break-all;
    }
  }
}
</style>
