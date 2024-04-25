<template>
  <nav>
    <div class="nav">
      <div class="title">
        <div class="logo" @click="$router.push('/home')">
          <img :src="config.logo_url" />
        </div>
        <!-- bloniea -->
      </div>
      <!-- pc导航菜单 -->
      <div class="nav-names">
        <ul>
          <li
            v-for="menu in menus"
            :key="menu.id"
            @click="toPage(menu.path)"
            :class="menu.class"
          >
            <i :class="'iconfont' + ' ' + menu.icon"></i>{{ menu.label }}
          </li>
        </ul>
      </div>
      <!-- app导航菜单 -->
      <div class="nav-names-app" v-if="navNameShow">
        <ul>
          <li
            v-for="menu in menus"
            :key="menu.id"
            @click.stop="toPage(menu.path)"
            :class="menu.class"
          >
            <i :class="'iconfont' + ' ' + menu.icon"></i>{{ menu.label }}
          </li>
        </ul>
      </div>
      <!-- 菜单显示按钮和搜索按钮 -->
      <div class="option">
        <!-- <div class="search">
          <el-input
            v-model="keyword"
            placeholder="search"
            :suffix-icon="Search"
            @keyup.enter="getArticles"
          />
        </div> -->
        <MySearchExperience></MySearchExperience>
        <!-- <div class="user">
          <el-dropdown>
            <el-avatar
              :size="40"
              :src="userinfo.avatar_url"
              v-if="loginStatus"
              @click="toMe"
            >
              <img :src="config.avatar_error" />
            </el-avatar>

            <el-avatar
              :size="50"
              :src="config.avatar_default"
              v-else
              vLoading
              ref="avatarLoad"
            >
              <img :src="config.avatar_error" />
            </el-avatar>

            <template #dropdown>
              <el-dropdown-menu v-if="loginStatus">
                <el-dropdown-item @click="toMe">个人中心</el-dropdown-item>
                <el-dropdown-item @click="logout">退出 </el-dropdown-item>
              </el-dropdown-menu>
              <el-dropdown-menu v-else>
                <el-dropdown-item @click="isShowLoginDialog"
                  >登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div> -->
        <div class="app-nav" v-if="navShow">
          <i class="iconfont iconcaidan" @click.stop="shouNav"></i>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"

const keyword = ref<string>("")
const navShow = ref<boolean>(true)

const menus = reactive([
  { id: 1, label: "主页", path: "/home", icon: "iconhome", class: "home" },
  { id: 2, label: "归档", path: "/archive", icon: "iconapple" },
  {
    id: 3,
    label: "分类",
    path: "/categories",
    icon: "icon14",
    class: "categories",
  },
  {
    id: 5,
    label: "友链",
    path: "/friends",
    icon: "iconlove",
    class: "friends",
  },
  { id: 6, label: "工具", path: "/tool", icon: "iconguanyu", class: "tool" },
  { id: 6, label: "关于", path: "/about", icon: "iconguanyu", class: "about" },
])
const navNameShow = ref<boolean>(false)

// 路由跳转
const router = useRouter()
const toPage = (path: string) => {
  navNameShow.value = !navNameShow.value
  router.push({ path: path })
}
// app 端显示隐藏菜单
const shouNav = () => {
  navNameShow.value = !navNameShow.value
}

// 如果app导航栏显示，app端监听touchstart事件将其隐藏，pc端则监听click
onMounted(() => {
  const listenEvent = (() => {
    const fun = () => {
      if (navNameShow.value) {
        navNameShow.value = !navNameShow
      }
    }
    document.addEventListener("touch", fun)
    document.removeEventListener("touch", fun, true)
    document.addEventListener("click", fun)
    document.removeEventListener("click", fun, true)
    document.addEventListener("scroll", fun)
    document.removeEventListener("scroll", fun, true)
  })()
})

watch(
  () => navNameShow.value,
  () => {
    const video = document.querySelector("video")
    if (video) {
      if (navNameShow.value) {
        video.style.display = "none"
      } else {
        video.style.display = "block"
      }
    }
  }
)
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
