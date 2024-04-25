<template>
  <Loading v-if="loading"></Loading>
  <div v-else>
    <MyContainer>
      <article>
        <div class="wraper">
          <el-image lazy fit="cover" :src="data.article.img_url">
            <template #error>
              <div class="image-slot">
                <el-image
                  lazy
                  :src="config.defaultImgUrl"
                  fit="cover"
                ></el-image>
              </div>
            </template>
          </el-image>
        </div>
        <div class="article-header">
          <el-image lazy fit="cover" :src="headbg"></el-image>
          <div class="head-bg"></div>
          <div class="title-box">
            <div class="title">
              <div class="title-name">{{ data.article.title }}</div>
            </div>
            <div class="info">
              <div class="article-info">
                <span
                  ><i class="iconfont icondate"></i>
                  {{ formatDate(data.article.created_at) }}</span
                >
                <span
                  @click="
                    toCategory(
                      data.article.category_id,
                      data.article.categorytitle
                    )
                  "
                  class="category_name"
                  ><i class="iconfont iconfenlei1"></i>
                  {{ data.article.categorytitle }}</span
                >
                <!-- <span v-if="data.article.labels.length"><i class="iconfont iconlabel"></i>{{getLabels(data.article.labels)}}</span> -->
              </div>
              <div class="source">
                source:
                <span class="source-name"> {{ data.article.img_source }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="article-content">
          <MdToHtml :html="data.article.content"></MdToHtml>
        </div>
      </article>
    </MyContainer>
    <Gitalk></Gitalk>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue"

import headbg from "@/assets/head-bg.png"

const route = useRoute()
const router = useRouter()
const loading = ref<boolean>(true)
const data = reactive({
  article: {} as ArticleData,
  comments: [],
  id: route.query.id as string | number,
})
// 根据id获取文章详情

const getArticleDetail = async (id: string | number) => {
  loading.value = true
  // 路由传过来的id
  const res = await getArticleApi(id)
  if (res && res.statusCode === 404) return router.push("/404")
  if (res && res.success === 1) {
    data.article = res.data as ArticleData
    loading.value = false
    useHead({
      title: res.data.title,
    })
  }
}
const init = () => {
  if (!data.id || isNaN(Number(data.id))) return router.push("/404")
  getArticleDetail(data.id)
}
onMounted(() => {
  init()
})

const toCategory = (id: string | number, name: string) => {
  router.push({
    path: "category",
    query: { name: name, id: id },
  })
}
watch(
  () => route.query.id,
  () => {
    init()
  }
)
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
