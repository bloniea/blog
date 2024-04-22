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
    <div class="star">
      <i
        class="iconfont iconstarton stared"
        title="取消收藏"
        v-if="isStar"
        @click="delStar"
      ></i>
      <i class="iconfont iconstaroff" title="收藏" v-else @click="star"></i>
    </div>

    <!-- <Comment
      @saveComment="saveComment"
      :comments="data.comments"
      :total="commentTatol"
      @loadAdd="loadAdd"
      :btnLoading="btnLoading"
      :addLoading="addLoading"
    ></Comment> -->
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

// const store = new useStore()
// 获取存在vuex的用户信息
// const user = computed(() => store.state.userinfo)
// const loginStatus = computed(() => store.state.status)

const route = useRoute()

const loading = ref<boolean>(true)
const data = reactive({
  article: {} as ArticleData,
  comments: [],
  id: route.query.id as string | number,
})
// 根据id获取文章详情
interface ArticleData {
  article_id: number
  title: string
  category_id: number
  content: string
  img_url: string
  img_source: string
  created_at: string | number
  categorytitle: string
}
const getArticleDetail = async (id: string | number) => {
  loading.value = true
  // 路由传过来的id
  const res = await getArticleApi(id)
  if (res && res.success === 1) {
    data.article = res.data as ArticleData
    loading.value = false
    console.log(data.article)
    // nextTick(() => {
    //   getComments(id)
    // })
    // if (loginStatus.value) getIsStar()
  } else {
    // router.push({ name: "NotFound" })
  }
}

getArticleDetail(data.id)
// 获取评论
const commentReq = reactive({
  pagenum: 1,
  pagesize: 10,
  orderBy: -1,
})

// 评论的数量
const commentTatol = ref(0)
// 获取评论

const getComments = async (id) => {
  const loadingInstance = ElLoading.service({
    target: ".comments",
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  })
  const res = await getCommentsApi(id, commentReq)
  if (res.status === 200 && res.ok) {
    data.comments = res.data.data
    commentTatol.value = res.data.total
  }
  loadingInstance.close()
}
// 加载评论
const addLoading = ref(false)
const getAddComments = async () => {
  addLoading.value = true
  const res = await getCommentsApi(data.id, commentReq)
  if (res.status === 200 && res.ok) {
    addLoading.value = false
    const resData = res.data.data
    data.comments = [...data.comments, ...res.data.data]
    commentTatol.value = res.data.total
  }
}
const loadAdd = () => {
  commentReq.pagenum++
  getAddComments()
}

// const getLabels = (labels) => {
//   const newV = labels.slice(0, 2)
//   const l = newV.join(' ')
//   return l
// }
const btnLoading = ref(false)
// 提交评论
const saveComment = async (val) => {
  const req = {
    article_id: data.article._id,
    user_id: user.value._id,
    content: val.content,
  }

  if (val.to_comment_id) req.to_comment_id = val.to_comment_id
  btnLoading.value = true
  const res = await addCommentApi(req)
  if (res.status === 200 && res.ok) {
    btnLoading.value = false
    ElMessage.success("评论成功")
    store.commit("setCommentIsNull", true)
    if (data.comments.length == commentTatol.value) {
      // data.comments.push(res.data.data)
      data.comments.unshift(res.data.data)
      commentTatol.value++
    }
  } else {
    btnLoading.value = false
    ElMessage.error("提交超时")
  }
}

// 是否已收藏
const isStar = ref(false)
const getIsStar = async () => {
  const res = await getIsStarApi(data.article._id)
  if (res.status === 200 && res.ok) {
    isStar.value = true
  }
}
//收藏
const star = async () => {
  if (loginStatus.value) {
    const req = {
      user_id: user.value.user_id,
      article_id: data.article._id,
    }
    const res = await addStarApi(req)
    if (res.status === 200 && res.ok) {
      ElMessage.success("收藏成功")
      isStar.value = true
    }
  } else {
    store.commit("setIsShowLogin", true)
    ElMessage.error("请先登录")
  }
}
// 取消收藏
const delStar = async () => {
  const res = await cancelStarApi(data.article._id)
  if (res.status === 200 && res.ok) {
    ElMessage.success("取消收藏成功")
    isStar.value = false
  }
}
const router = useRouter()
const toCategory = (id, name) => {
  router.push({
    name: "CategoryDetail",
    params: { id: id },
    query: { name: name },
  })
}

// watch(
//   () => store.state.status,
//   (val) => {
//     if (val) {
//       getIsStar()
//     } else {
//       isStar.value = false
//     }
//   }
// )
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
