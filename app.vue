<template>
  <div id="bg" :style="`background-image:url(${config.bg_url});`"></div>
  <div class="container">
    <!--  顶部进度条 -->
    <TopProgress />
    <!-- 导航 -->
    <Nav></Nav>
    <!-- 主体 -->
    <main>
      <NuxtPage />
    </main>
    <!-- 回到顶部 -->
    <BackToTop></BackToTop>
    <!-- 版权 -->
    <Copyright></Copyright>
  </div>
</template>

<script setup lang="ts">
import { config } from "./utils/config"
</script>

<style lang="stylus" scoped>
.container {
  display flex
  min-height 100vh
  flex-direction column
  justify-content space-between
  min-width 320px

}
main {
  width 800px
  margin 0px auto
  min-height 80vh
  @media screen and (max-width 834px) {
    width 100%
  }
}
</style>
