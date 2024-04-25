<template>
  <div id="gitalk-container"></div>
</template>

<script lang="ts" setup>
import "gitalk/dist/gitalk.css"
import Gitalk from "gitalk"

onMounted(() => {
  var gitalk = new Gitalk({
    clientID: "c96d24e6d3b6615d63d9",
    clientSecret: "fe703289685f0b4010a3db828dc230ecb27917ea",
    repo: "blog",
    owner: "bloniea",
    admin: ["bloniea"],
    id: location.pathname + location.search, // Ensure uniqueness and length less than 50
    distractionFreeMode: false, // Facebook-like distraction free mode
    title: location.pathname + location.search,
    language: "zh-CN",
  })

  gitalk.render("gitalk-container")
})
</script>

<style lang="stylus" scoped></style>
