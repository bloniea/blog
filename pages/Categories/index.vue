<template>
  <!-- <div
    class="categories"
    v-if="isChildRoute"
  >
    <router-view></router-view>
  </div> -->
  <Loading v-if="loading"></Loading>
  <MyContainer v-else>
    <div class="categories">
      <div
        class="category bg-shadow"
        v-for="category in categoryData.categories"
        :key="category.category_id"
        @click="toDetail(category.category_id, category.name)"
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <div class="img">
          <el-image :src="category.img_url" fit="cover"></el-image>
        </div>
        <!-- 半透明层 -->
        <div class="opacity">
          <div class="name categoty-item-name">
            {{ category.name }}
          </div>
          <div class="date">
            {{ formatDate(category.created_at) }}
          </div>
        </div>
      </div>
    </div>
    <Pagination
      :pages="categoryData.req.pages"
      :pageNumber="categoryData.req.pageNumber"
      :total="categoryData.total"
      @changePage="changePage"
    ></Pagination>
  </MyContainer>
</template>

<script setup lang="ts">
import { ref } from "vue"
const route = useRoute()
const loading = ref<boolean>(true)
useHead({ title: "文章分类" })
// let isChildRoute = ref(false)
// // 判断是否存在参数id，如果存在显示该id的分类目录文章详情
// const isId = () => {
//   if (route.params.id) {
//     isChildRoute = ref(true)
//   } else {
//     isChildRoute = ref(false)
//   }
// }
// isId()
const router = useRouter()
// 路由跳转至该分类id详情页
const toDetail = (id: string | number, cat_name: string) => {
  router.push({
    path: "/category",
    query: { id: id, name: cat_name },
  })
}

// 获取分类列表

const categoryData = reactive({
  categories: [] as CategoryData[],
  total: 0,
  req: {
    pages: 9,
    pageNumber: 1,
  },
})
const getCategories = async () => {
  loading.value = true
  const res = await getCategoriesApi(categoryData.req)
  if (res && res.success === 1) {
    categoryData.categories = res.data.result as CategoryData[]
    categoryData.total = Number(res.data.total)
    loading.value = false
  }
}
onMounted(() => {
  getCategories()
})

const changePage = (page: number) => {
  categoryData.req.pageNumber = page
  getCategories()
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
