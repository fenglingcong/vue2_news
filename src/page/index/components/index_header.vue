<template>
  <div class="header">
    <!-- 头部 -->
    <header>
      <div class="top_bar">
        <div class="abs_m">
          <a class="title" @click.stop="goTop"></a>
        </div>
        <div class="abs_r">
          <a class="search_btn"></a>
        </div>
      </div>
    </header>
    <!-- 导航 -->
    <nav>
      <div class="nav_ul">
        <a href="javascript:;" v-for="(item, index) in indexColumn" :key="index" :class="{active: indexActive === item.classpath}" @click.stop="navClick(item.classpath)">{{item.classname}}</a>
      </div>
      <!-- 更多栏目 -->
      <div class="nav_menu">
        <div class="shadow"></div>
        <a href="javascript:;" class="more_btn"></a>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import cache from '@/utils/cache'
export default {
  computed: {
    ...mapState('index', [
      'indexColumn',
      'indexActive'
    ]),
    ...mapGetters('index', [
      'activeMeta'
    ])
  },
  watch: {
    indexActive () {
      this.slideTo(this.activeMeta.index)
    }
  },
  methods: {
    ...mapMutations('index', [
      'set_indexActive'
    ]),
    // 实现导航栏滚动
    slideTo (index) {
      this.$nextTick(() => {
        let _container = $('.nav_ul') // 获取滚动容器元素
        let _column = $('.nav_ul a').eq(index) // 获取当前active栏目元素
        if (_column) {
          let move // 最终滚动值
          let containerWidth = _container.width() // 容器宽度
          let containerLeft = _container.scrollLeft() // 容器当前滚动条的值
          let columnWidth = _column.width() // 栏目宽度
          let columnLeft = _column.position().left // 栏目距离屏幕左边的距离
          let midWidth = (containerWidth - columnWidth) / 2 // 屏幕中心线的宽度
          // 容器滚动为0，并且active栏目位于中间线左边 ？ 滚动值为0 : 当前容器滚动值 + （active栏目相对于中间线的值，有正负）
          if (containerLeft === 0 && columnLeft <= midWidth) {
            move = 0
          } else {
            move = containerLeft + columnLeft - midWidth
          }
          _container.animate({'scrollLeft': move}, 300)
          cache.setSession('navScrollLef', move)
        }
      })
    },
    // 滚动恢复
    scrollRecover () {
      let move = cache.getSession('navScrollLef') // 移动后的值
      if (move) {
        this.$nextTick(() => {
          $('nav_ul').scrollLeft(move)
        })
      }
    },
    navClick (type) {
      this.set_indexActive(type)
    },
    goTop () {
      $(`#index .${this.indexActive}`).animate({scrollTop: 0})
    }
  },
  // activated钩子是要在keep-alive下才能使用
  activated () {
    this.scrollRecover()
  }
}
</script>

<style lang="stylus">
.header{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  overflow: hidden;
  header{
    display: block;
    position: relative;
    background-color: #00939c;
    overflow: hidden;
    color: #fff;
    .title{
      background-image: url(../../../assets/img/news_logo.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 145px;
    }
    .search_btn{
      background-image: url(../../../assets/img/search.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 24px;
    }
    .top_bar{
      position: relative;
      height: 44px;
      line-height: 44px;
      user-select: none;
      a{
        display: block;
        width: 100%;
        height: 100%;
      }
      .abs_m,.abs_r{
        position: absolute;
        top: 0;
        width: 44px;
        height: 100%;
        text-align: center;
      }
      .abs_m{
        width: 100%;
      }
      .abs_r{
        right: 0;
      }
    }
  }
  nav{
    position: relative;
    height: 36px;
    background-color: #f4f5f6;
    border-bottom: 1px solid #ddd;
    line-height: 36px;
    .nav_ul{
      padding-right: 40px;
      overflow-x: auto;
      white-space: nowrap;
      font-size: 0;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar{
        width: 0;
        height: 0;
      }
      a{
        display: inline-block;
        margin-left: 5px;
        padding: 0 10px;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
        color: #505050;
        -webkit-tap-highlight-color: rgba(0, 0, 0, .3);
        text-decoration: none;
        &:last-child{
          margin-right: 5px;
        }
        &.active{
          color: #00939c;
          border-bottom: 2px solid #00939c;
        }
      }
    }
    .nav_menu{
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      .shadow{
        position: absolute;
        left: -10px;
        width: 10px;
        height: 100%;
        background-image: url(../../../assets/img/shadow.png);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-color: rgba(244, 245, 246, .4);
      }
      .more_btn{
        display: block;
        width: 40px;
        height: 100%;
        background-image: url(../../../assets/img/menu_more.png);
        background-position: center;
        background-repeat: no-repeat;
        background-size: 20px;
        background-color: #f4f5f6;
      }
    }
  }
}
</style>
