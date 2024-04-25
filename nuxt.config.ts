// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@element-plus/nuxt", "@nuxtjs/sitemap"],
  css: ["~/assets/Styles/base.styl", "~/assets/Styles/iconfont.styl"],

  app: {
    head: {
      // script: [
      // ],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        stylus: {
          imports: [process.cwd() + "/assets/Styles/variable.styl"],
        },
      },
    },
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "https://blog.api.bloniea.com/open/v1/",
        changeOrigin: true,
      },
    },
  },
  site: {
    url: "https://bloniea.com",
    name: "可愛くなりたいbloniea",
    description: "Welcome to my awesome site!",
    defaultLocale: "en", // not needed if you have @nuxtjs/i18n installed
    cacheTime: 1000 * 60 * 15,
  },
  sitemap: {
    sources: ["/api/sitemap"],
    excludeAppSources: true,
  },
})
