<template>
  <div>
    <ul class="listItem" v-for="(item, index) in itemJson" :key="index">
      <!-- 视频 -->
      <li v-if="item.playonlineurl">
        <router-link :to="url(item)" class="video">
          <div class="video_wrapper">
            <div class="video_info">
              <div class="video_title">
                <p v-html="item.title"></p>
              </div>
              <div class="totalTime">{{item.playtime}}</div>
              <img v-lazy.container="item.titlepic">
            </div>
            <div class="playRound">
              <div class="playSan"></div>
            </div>
          </div>
          <listInfo :json="item"></listInfo>
        </router-link>
      </li>
      <!-- 1张大图 -->
      <li v-else-if="item.ptitlepic">
        <router-link :to="url(item)" class="oneLarge">
          <div class="news_title">
            <h3 v-html="item.title"></h3>
          </div>
          <div class="news_img">
            <img v-lazy.container="item.ptitlepic">
          </div>
          <list-info :json="item"></list-info>
        </router-link>
      </li>
      <!-- 3张小图 -->
      <li v-else-if="item.titlepic3">
        <router-link :to="url(item)" class="threeSmall">
          <div class="news_title">
            <h3 v-html="item.title"></h3>
          </div>
          <div class="list_img">
            <ul>
              <li><img v-lazy.container="item.titlepic"></li>
              <li><img v-lazy.container="item.titlepic2"></li>
              <li><img v-lazy.container="item.titlepic3"></li>
            </ul>
          </div>
          <list-info :json="item"></list-info>
        </router-link>
      </li>
      <!-- 1张小图 -->
      <li v-else-if="item.titlepic">
        <router-link :to="url(item)" class="oneSmall">
          <div class="news_title">
            <h3 v-html="item.title"></h3>
            <list-info :json="item"></list-info>
          </div>
          <div class="news_img">
            <img v-lazy.container="item.titlepic">
          </div>
        </router-link>
      </li>
      <!-- 文字 -->
      <li v-else-if="item.title">
        <router-link :to="url(item)" class="text">
          <h3 v-html="item.title"></h3>
          <list-info :json="section"></list-info>
        </router-link>
      </li>
      <li v-else-if="item.type" id="lookHere">
        <p>上次看到这里，点击刷新<i class="icon-refresh"></i></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    itemJson: Array
  },
  methods: {
    url (item) {
      return `/detail?classid=${item.classid}&id=${item.id}&datafrom=${item.datafrom}`
    }
  }
}
</script>

<style lang="stylus">
.listItem{
  font-size: 16px;
  li{
    margin: 0 .15rem;
    border-bottom: 1px solid rgba(233, 233, 233, .8);
  }
  a{
    display: block;
    padding: .15rem 0;
    width: 100%;
    outline: none;
    color: #333;
    -webkit-tap-highlight-color: rgba(0, 0, 0, .1);
  }
  a:visited h3{
    color: #999;
  }
  img{
    background: #ddd;
  }
  img[lazy=loading]{
    height: 100%;
  }
  h3{
    display: -webkit-box;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    white-space: normal;
    line-height: 20px;
    font-size: 16px;
    font-weight: 400;
    color: #333;
    overflow: hidden;
  }
  .oneSmall{
    font-size: 0;
    &>div{
      display: inline-block;
      vertical-align: middle;
    }
    .news_title{
      width: 67%;
      overflow: hidden;
      h3{
        margin-right: .1rem;
      }
    }
    .news_img{
      width: 33%;
      height: 0.74rem;
      overflow: hidden;
      img{
        width: 100%;
        min-height: 100%;
      }
    }
  }
  .threeSmall{
    .list_img{
      margin-top: 0.06rem;
      width: 100%;
    }
    ul{
      width: 100%;
      font-size: 0;
    }
    li{
      display: inline-block;
      margin: 0;
      width: 33.3%;
      height: .74rem;
      overflow: hidden;
      &:nth-child(2){
        padding: 0 2px;
      }
    }
    img{
      width: 100%;
      min-height: 100%;
    }
  }
  .oneLarge{
    .news_img{
      margin-top: 0.06rem;
      width: 100%;
      height: 1.78rem;
      overflow: hidden;
    }
    img{
      width: 100%;
    }
  }
  .video{
    video{
      width: 100%;
    }
  }
  .video_wrapper{
    position: relative;
    width: 100%;
    height: 1.78rem;
    overflow: hidden;
    color: #999;
    .video_info{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 111;
        display: block;
        width: 100%;
        height: auto;
      }
    }
    .video_title{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 222;
      width: 100%;
      height: 80px;
      background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
      color: #fff;
      p{
        padding: 8px .15rem 0;
        line-height: 24px;
        font-size: 14px;
        color: #fff;
      }
    }
    .totalTime{
      position: absolute;
      right: 5px;
      bottom: 5px;
      z-index: 222;
      display: inline-block;
      width: 40px;
      height: 20px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
      color: #fff;
    }
    .playRound{
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 222;
      margin-left: -25px;
      margin-top: -25px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid #fff;
    }
    .playSan{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      font-size: 0;
      border: 16px solid #fff;
      border-color: transparent transparent transparent rgba(255, 255, 255, .8);
      margin-top: -16px;
      margin-left: -5px;
    }
  }
  #lookHere{
    margin: 0;
    background: #f4f5f6;
    border: 0;
    p{
      margin: 0;
      padding: 10px 0;
      line-height: 18px;
      text-align: center;
      font-size: 12px;
      color: #00939c;
      user-select: none;
    }
  }
}
</style>
