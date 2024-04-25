<template>
  <div></div>
</template>

<script lang="ts" setup>
const route = useRoute(),
  router = useRouter()

if (route.path === "/") {
  router.push("/home")
}
</script>

<style lang="stylus" scoped></style>
