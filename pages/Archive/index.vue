<template>
  <Loading v-if="loading"></Loading>

  <MyContainer v-else>
    <ArticleList
      :articles="article.list"
      @toArticleDetail="toArticleDetail"
    ></ArticleList>
    <!-- <Pagination
      :pagesize="article.req.pagesize"
      :pagenum="article.req.pagenum"
      :total="article.total"
      @changePage="changePage"
    ></Pagination> -->

    <Pagination
      :pages="article.req.pages"
      :pageNumber="article.req.pageNumber"
      :total="article.total"
      @changePage="changePage"
    ></Pagination>
  </MyContainer>
</template>

<script setup lang="ts">
const router = useRouter()
const loading = ref<boolean>(false)
useHead({ title: "文章归档" })
const article = reactive({
  req: {
    pages: 10,
    pageNumber: 1,
  },
  list: [],
  total: 0,
})
// 获取文章
const getArticles = async () => {
  loading.value = true
  const res = await getArticlesApi(article.req)
  if (res && res.success === 1) {
    loading.value = false
    article.list = res.data.result
    article.total = Number(res.data.total)
  }
}
getArticles()

const toArticleDetail = (id: number) => {
  router.push({ path: "/article", query: { id: id } })
}
const changePage = (page: number) => {
  article.req.pageNumber = page
  getArticles()
}
</script>

<style lang="stylus" scoped>
.my-container {
  padding 10px

}
</style>
