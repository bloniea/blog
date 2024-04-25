<template>
  <article
    class="bg-shadow"
    v-if="!articles.length"
    data-aos="flip-left"
    data-aos-easing="ease-out-cubic"
    data-aos-duration="2000"
  >
    <div class="null">空空如也~</div>
  </article>
  <article
    v-else
    v-for="article in articles"
    :key="article.article_id"
    @click="toArticleDetail(article.article_id)"
    class="bg-shadow"
    data-aos="flip-left"
    data-aos-easing="ease-out-cubic"
    data-aos-duration="2000"
  >
    <div class="article-img">
      <!-- <img
        :src="article.img_url"
        alt=""
      >-->
      <el-image lazy :src="article.img_url" fit="cover">
        <template #error>
          <div class="image-slot">
            <el-image lazy :src="config.defaultImgUrl" fit="cover"></el-image>
          </div>
        </template>
      </el-image>
    </div>

    <div class="article-message">
      <h3 class="article-title gradient-title">
        {{ article.title }}
      </h3>
      <div
        class="article-content"
        v-html="beforeArticle(article.content)"
      ></div>
      <div class="more">
        <i class="iconfont iconmore"></i>
      </div>
      <div class="article-info">
        <div class="date">
          <span class="iconfont icondate"></span>
          {{ formatDate(article.created_at) }}
        </div>
        <!-- <div
          class="label"
          v-if="article.labels[0]"
        >
          <span class="iconfont iconlabel"></span>
          {{article.labels[0]}}
        </div> -->
        <div
          class="category"
          @click.stop="toCategory(article.category_id, article.categorytitle)"
        >
          <span class="iconfont iconfenlei"></span>
          {{ article.categorytitle }}
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { onMounted, ref } from "@vue/runtime-core"

import { useRouter } from "vue-router"

const props = defineProps({
  articles: Array,
})
const articles = props.articles as ArticleData[]
onMounted(() => {})
const emit = defineEmits(["toArticleDetail"])
const toArticleDetail = (id: number) => {
  emit("toArticleDetail", id)
}
const router = useRouter()
const toCategory = (id: number, name: string) => {
  router.push({
    name: "CategoryDetail",
    params: { id: id },
    query: { name: name },
  })
}
</script>

<style lang="stylus" scoped>
@import 'index.styl'
</style>
