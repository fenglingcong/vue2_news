<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  position: relative;
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  overflow: hidden;
}
</style>
