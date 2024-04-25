<template>
  <Loading v-if="loading" />
  <div class="tools" v-else>
    <MyContainer>
      <router-view v-if="$route.meta.tool" class="allTtool"></router-view>

      <div class="tool-main" v-else>
        <div class="tool">
          <div class="title">实用工具</div>
          <div class="tool-box">
            <div
              class="tool-list bg-shadow"
              v-for="list in config.tools"
              :key="list.id"
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
            >
              <div class="image">
                <el-image :src="list.img_url" alt="" fit="cover"></el-image>
              </div>
              <div class="content">
                <div class="content-title" @click="toPath(list.router_name)">
                  {{ list.title }}
                </div>
                <div class="content-subtitle">{{ list.subtitle }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MyContainer>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
useHead({ title: "实用工具" })
const toPath = (n: string) => {
  router.push({ path: n })
}
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
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
