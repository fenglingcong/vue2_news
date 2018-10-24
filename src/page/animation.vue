<template>
  <div class="animation">
  <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
    <div class="btn" @click="show = !show">开始动画</div>
    <div class="box">
      <transition name="ani">
        <div v-show="show" class="slider"></div>
      </transition>
    </div>
    <div class="bg_line"></div>
    <transition name="bounce">
      <div v-show="show" class="box"></div>
    </transition>
    <div class="bg_line"></div>
    <div class="content">
      <transition name="fade">
        <p class="fade" v-show="show">hello</p>
      </transition>
      <transition enter-active-class="animated tada" leave-active-class="animated bounceOutRight"
      >
        <p class="fade" v-show="show">hello</p>
      </transition>
    </div>
    <div class="bg_line"></div>
    <div class="demo" id="list-demo">
      <button @click="add">Add</button>
      <button @click="remove">Remove</button>
      <button @click="shuffle('line')">洗牌</button>
      <transition-group name="list" tag="p">
        <span v-for="item in items" :key="item" class="list-item">{{item}}</span>
      </transition-group>
    </div>
    <div class="bg_line"></div>
    <div class="demo">
      <button @click="shuffle('cells')">列表shuffle</button>
      <transition-group name="cell" tag="div" class="grid">
        <div v-for="item in cells" :key="item.id" class="cell">{{item.num}}</div>
      </transition-group>
    </div>
    <div class="bg_line"></div>
    <div class="staggered">
      <input type="text" v-model="query">
      <transition-group name="staggered" tag="ul" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <li v-for="(item, index) in computedList" :key="item.msg" :data-index="index">{{item.msg}}</li>
      </transition-group>
    </div>
  </div>
</template>

<script>
var _ = require('lodash')
export default {
  data () {
    return {
      show: false,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10,
      cells: Array.apply(null, { length: 81 })
        .map(function (_, index) {
          return {
            id: index,
            num: index % 9 + 1
          }
        }),
      query: '',
      list: [
        { msg: 'Bruce Lee' },
        { msg: 'Jackie Chan' },
        { msg: 'Chuck Norris' },
        { msg: 'Jet Li' },
        { msg: 'Kung Fury' }
      ]
    }
  },
  computed: {
    computedList () {
      return this.list.filter((item) => {
        return item.msg.toLowerCase().indexOf(this.query.toLowerCase()) !== -1
      })
    }
  },
  methods: {
    beforeEnter (el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter (el, done) {
      var delay = el.dataset.index * 150
      $(el).animate({opacity: 1, height: '32px'}, delay, done)
    },
    leave (el, done) {
      var delay = el.dataset.index * 150
      $(el).animate({opacity: 0, height: 0}, delay, done)
    },
    randomIndex () {
      return Math.floor(Math.random() * this.items.length)
    },
    add () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove () {
      this.items.splice(this.randomIndex(), 1)
    },
    shuffle (type) {
      if (type === 'line') {
        this.items = _.shuffle(this.items)
      }
      if (type === 'cells') {
        this.cells = _.shuffle(this.cells)
      }
    }
  }
}
</script>

<style scoped>
.animation{
  padding-top: 20px;
  height: 100%;
  background: #fff;
  text-align: center;
  font-size: 16px;
  overflow: auto;
}
.bg_line{
  margin: 20px 0;
  width: 100%;
  height: 2px;
  background-color: #efefef;
}
.content{
  text-align: center;
}
.btn{
  margin: 0 auto;
  width: 100px;
  height: 36px;
  background: #4280f0;
  border-radius: 6px;
  text-align: center;
  line-height: 36px;
  color: #fff;
}
.box{
  margin: 20px auto;
  width: 100px;
  height: 100px;
  background: pink;
  border: 1px solid #ccc;
  overflow: hidden;
}
.slider{
  width: 100%;
  height: 100%;
  background: #4280f0;
  transition: transform 3s ease-out;
}

.staggered{
  margin-bottom: 20px;
}
.staggered input{
  margin-bottom: 10px;
  padding: 6px;
  border: 1px solid #ccc;
}

.grid{
  margin: 10px auto 30px;
  display: flex;
  flex-wrap: wrap;
  width: 219px;
}
.cell{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: -1px;
  margin-bottom: -1px;
  width: 25px;
  height: 25px;
  border: 1px solid #ccc;
}
.cell:nth-child(3n) {
  margin-right: 0;
}
.cell:nth-child(27n) {
  border-bottom-color: #f30;
  margin-bottom: 0;
}
.cell-move{
  transition: transform 1s;
}

.flip-list-move{
  transition: transform 1s;
}

.list-item{
  display: inline-block;
  margin-right: 10px;
  transition: all 1s;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active{
  position: absolute;
}
button{
  margin-bottom: 10px;
  padding: 6px 8px;
  font-size: 14px;
  border: 0;
  outline: none;
}

.bounce-enter-active{
  animation: bounce-in .5s infinite;
}
.bounce-leave-active{
    animation: bounce-in .5s reverse infinite;
}
@keyframes bounce-in{
  0%{
    transform: scale(0);
    transform: translate3d(-100%, 0, 0);
  }
  33.333%{
    transform: scale(1);
    transform: translate3d(0, 100px, 0);
  }
  66.666%{
    transform: scale(1.2);
    transform: translate3d(100%, 0, 0);
  }
  100%{
    transform: scale(1);
    transform: translate3d(0, -100px, 0);
  }
}

.fade{
  transition: all 3s;
}
.fade-enter{
  transform: translate3d(-50px, 0, 0);
  opacity: 0;
}
.fade-leave-to{
  transform: translate3d(50px, 0, 0);
  opacity: 0;
}

.ani-enter{ /*过度的开始状态*/
  transform: translate3d(-100%, -100%, 0);
}
/*定义过度生效时的状态。这个类被用来定义进入过度的过程时间，延迟和曲线函数*/
.ani-enter-active{
  /*transition: transform 3s ease-out;*/
}
.ani-enter-to{ /*过度的结束状态*/
  transform: translate3d(0, 0, 0);
}
.ani-leave{
  /*transform: translate3d(0, 0, 0);*/
}
.ani-leave-active{
  /*transition: transform .3s ease-out;*/
}
.ani-leave-to{
  transform: translate3d(100%, 100%, 0);
}
</style>
