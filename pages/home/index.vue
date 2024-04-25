<template>
  <Loading v-if="loading" />
  <div class="home" v-else>
    <article
      class="article article-pc"
      v-for="(article, i) in articlesData.articles"
      :key="article.article_id"
      @click="toArticleDetail(article.article_id)"
    >
      <!-- 文字在左，图片在右 -->

      <div
        class="article-box bg-shadow"
        v-if="i % 2 !== 0"
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
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

            <div
              class="category"
              @click.stop="
                toCategory(article.category_id, article.categorytitle)
              "
            >
              <span class="iconfont iconfenlei"></span>
              {{ article.categorytitle }}
            </div>
          </div>
        </div>
        <div class="article-img">
          <el-image lazy :src="article.img_url" class="img" fit="cover">
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
      </div>
      <!-- 文字在右，图片在左 -->
      <div
        class="article-box bg-shadow"
        v-else
        data-aos="fade-left"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        <div class="article-img">
          <el-image lazy :src="article.img_url" class="img" fit="cover">
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

            <div
              class="category"
              @click.stop="
                toCategory(article.category_id, article.categorytitle)
              "
            >
              <span class="iconfont iconfenlei"></span>
              {{ article.categorytitle }}
            </div>
          </div>
        </div>
      </div>
    </article>

    <!-- 移动端 <=768 -->
    <article
      class="article article-app"
      v-for="article in articlesData.articles"
      :key="article.article_id"
      @click="toArticleDetail(article.article_id)"
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
    >
      <div class="article-box bg-shadow">
        <div class="article-img">
          <el-image lazy :src="article.img_url" class="img" fit="cover">
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

            <div
              class="category"
              @click.stop="
                toCategory(article.category_id, article.categorytitle)
              "
            >
              <span class="iconfont iconfenlei"></span>
              {{ article.categorytitle }}
            </div>
          </div>
        </div>
      </div>
    </article>
    <Pagination
      :pages="articlesData.req.pages"
      :pageNumber="articlesData.req.pageNumber"
      :total="articlesData.total"
      @changePage="changePage"
    ></Pagination>
  </div>
</template>

<script setup lang="ts">
const loading = ref<boolean>(true)

useHead({ title: "bloniea|可愛くなりたい" })
// 获取文章列表
const articlesData = reactive({
  articles: {} as any,
  req: {
    pages: 10,
    pageNumber: 1,
  },
  total: 0,
})
// 获取文章
const getArticles = async () => {
  loading.value = true
  const res = await getArticlesApi(articlesData.req)
  if (res && res.success === 1) {
    loading.value = false
    articlesData.articles = res.data.result
    articlesData.total = Number(res.data.total)
  }
}

onMounted(() => {
  getArticles()
})
// 页码改变的方法
const changePage = (page: number) => {
  articlesData.req.pageNumber = page
  getArticles()
}

// 跳转到文章详情页面
const router = useRouter()
const toArticleDetail = (id: number) => {
  router.push({ path: "/article", query: { id: id } })
}

// 跳转到文章分类详情
const toCategory = (id: number, name: string) => {
  router.push({
    name: "category",
    query: { id: id, name: name },
  })
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
