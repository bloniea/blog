// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@element-plus/nuxt"],
  css: ["~/assets/Styles/base.styl", "~/assets/Styles/iconfont.styl"],
  app: {},
  vite: {
    css: {
      preprocessorOptions: {
        stylus: {
          imports: [process.cwd() + "/assets/Styles/variable.styl"],
          // additionalData: '@import "@/assets/Styles/variable.styl";',
        },
      },
    },
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "https://blog.api.bloniea.com/open/v1/",
        // target: "http://localhost:3001/v1/",
        changeOrigin: true,
      },
    },
  },
})
