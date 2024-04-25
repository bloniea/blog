<template>
  <Loading v-if="loading"></Loading>

  <MyContainer v-else>
    <div class="category-detail">
      <div class="title">
        <span> Category:</span>
        <span class="cate-name"
          >{{ data.cat_name }} <i class="iconfont iconclose" @click="last"></i>
        </span>
      </div>
      <ArticleList
        :articles="data.articles"
        @toArticleDetail="toArticleDetail"
      ></ArticleList>
      <Pagination
        :pages="data.req.pages"
        :pageNumber="data.req.pageNumber"
        :total="data.total"
        @changePage="changePage"
      ></Pagination>
    </div>
  </MyContainer>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const loading = ref(true)
useHead({ title: route.query.name + "分类" })
const last = () => {
  // router.push({ path: "/categories" })
  router.back()
}

const data = reactive({
  articles: [],
  cat_name: "",
  req: {
    pages: 10,
    pageNumber: 1,
    category_id: null as null | number,
  },
  total: 0,
})
// 根据分类id获取该分类发文章
const getCategoryDetail = async () => {
  loading.value = true
  data.cat_name = route.query.name as string
  data.req.category_id = route.query.id as null | number
  const res = await getArticlesApi(data.req)
  if (res && res.success === 1) {
    data.articles = res.data.result
    data.total = Number(res.data.total)
    loading.value = false
  } else {
    // router.push("/404")
  }
}
getCategoryDetail()
// 页码改变
const changePage = (page: number) => {
  data.req.pageNumber = page
  getCategoryDetail()
}

const toArticleDetail = (id: number) => {
  router.push({ path: "/article", query: { id: id } })
}
</script>

<style lang="styl" scoped>
@import './index.styl';
</style>
