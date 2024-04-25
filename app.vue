<template>
  <div id="bg" :style="`background-image:url(${imgUrl});`"></div>
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
const imgUrl: string =
  "https://images.bloniea.com/images/1c578576f3febd248c95cf42d2c90e84_7938769883542524513_1711287074118_960.webp"
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
