<template>
  <Loading v-if="loading"></Loading>
  <div class="about" v-else>
    <MyContainer>
      <div class="top">
        <div class="avatar">
          <el-avatar :size="140" :src="config.avatar"></el-avatar>
        </div>
        <div class="info">
          <div
            class="info-list"
            v-for="title in config.aboutTitles"
            :key="title.title"
          >
            <i class="iconfont iconshandian"></i>
            <span v-html="title.title"></span>
          </div>
        </div>
      </div>
      <div class="contact">
        <el-avatar
          class="contact-list"
          v-for="contact in config.contacts"
          :key="contact.url"
          :src="contact.img_url"
          @click="toContact(contact.url)"
        >
          <img :src="config.avatar_error" />
        </el-avatar>
      </div>
    </MyContainer>

    <!-- <MyContainer v-for="item in article.list" :key="item._id">
      <div class="title shadow">{{ item.title }}</div>
      <div class="content">
        <MdToHtml :html="item.content"></MdToHtml>
      </div>
    </MyContainer> -->
    <!-- <Pagination
      :pagesize="article.reqData.pagesize"
      :pagenum="article.reqData.pagenum"
      :total="article.total"
      @changePage="changePage"
    ></Pagination> -->
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
useHead({ title: "关于我" })
const loading = ref<boolean>(true)
;(function () {
  let timerId: NodeJS.Timeout
  let timerHandle: number

  timerId = setTimeout(() => {
    clearTimeout(timerHandle)
    loading.value = false
  }, 200)
  timerHandle = timerId as unknown as number
})()
// const article = reactive({
//   list: [],
//   total: 0,
//   reqData: {
//     pagenum: 1,
//     pagesize: 3,
//   },
// })

// const getArticles = async () => {
//   const res = await getAboutArticles(article.reqData)
//   if (res.status == 200 && res.ok) {
//     article.list = res.data.data
//     if (!res.data.data.length) {
//       router.push({ name: 'About', query: { page: 1 } })
//     }
//     article.total = res.data.total
//     loading.value = false
//   }
// }
// getArticles()
// 打开作者联系页面
const toContact = (url: string) => {
  window.open(url)
}

// const changePage = (page:number) => {
//   article.reqData.pagenum = page
//   loading.value = true
//   getArticles()
// }
</script>

<style lang="stylus" scoped>
.about {
  .my-container {
    padding 20px
    position relative
    .title{
      position absolute
      left -40px
      background: $baseColor
      color #fff
      padding 6px
      font-size 20px
      }
    .content{
      padding-top 60px
      font-size 18px
      color #380845
      }
    .top {
      display flex
      .avatar {
        width 8.75rem
        height 8.75rem
      }
      .info {
        margin-left 50px
        .info-list {
          margin 10px 0
        }
      }
    }
    .contact {
      margin-top 20px
      text-align center
      display flex
      justify-content center
      .el-avatar {
        margin 0 20px
      }
      .contact-list {
        // padding 0 20px
        cursor $my-cursor-pointer
        // border 3px solid !important
        &:hover {
          // color $baseColor
        }
      }
    }
  }
}
</style>
