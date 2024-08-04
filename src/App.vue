<script>
export default {

}
</script>
<template>
  <van-nav-bar title="去中心化投票" />
  <main>
    <router-view></router-view>
  </main>
  <van-tabbar route v-model="active">
    <van-tabbar-item to="/" icon="gem">分发票权</van-tabbar-item>
    <van-tabbar-item to="/account" icon="friends">账户信息</van-tabbar-item>
    <van-tabbar-item to="bord" icon="description">投票看板</van-tabbar-item>
  </van-tabbar>
</template>



<style lang="less">
  html,body{
    overflow: hidden;
  }
</style>