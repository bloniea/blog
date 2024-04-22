<template>
  <div class="pagination">
    <div class="prev" @click="prev" v-if="prevShow">prev</div>
    <div class="next" @click="next" v-if="nextShow">next</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
const props = defineProps({
  pageNumber: Number,
  pages: Number,
  total: Number,
})
const prevShow = ref<boolean>(true)
const nextShow = ref<boolean>(true)
const myemit = defineEmits(["changePage"])
// 初始化

const pageInit = () => {
  const pageNumber = props.pageNumber as number,
    total = props.total as number,
    pages = props.pages as number
  if (pageNumber <= 1) {
    prevShow.value = false
  }
  if (pageNumber * pages >= total) {
    nextShow.value = false
  }
}
onMounted(() => {
  pageInit()
})

// 上一页
const prev = () => {
  let pageNumber = props.pageNumber as number
  pageNumber -= 1
  if (pageNumber <= 1) {
    pageNumber = 1
    prevShow.value = false
  }
  myemit("changePage", pageNumber)
}
// 下一页
const next = () => {
  let pageNumber = props.pageNumber as number,
    total = props.total as number,
    pages = props.pages as number
  pageNumber += 1
  if (pageNumber * pages >= total) {
    nextShow.value = false
  }
  // console.log(props.pageNumber)
  myemit("changePage", pageNumber)
}
</script>

<style lang="stylus" scoped>
.pagination {
  display flex
  justify-content center
  padding 20px 0
  div {
    padding 10px 15px
    // margin 10px
    background #9c27b0
    color #fff
    cursor $my-cursor-pointer
    transition all 0.3s
    &:hover {
      background #6d0695
    }
  }
}
</style>
