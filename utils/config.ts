export const config = {
  loading: "https://images.bloniea.com/images1/loading.gif",
  defaultImgUrl: "https://images.bloniea.com/images1/QQ截图20220211210130.png",
  avatar: "https://images.bloniea.com/images1/77265017_p0.jpg",
  url: "https://bloniea.com/",
  title: "bloniea|可愛くなりたい",
  avatar_error: "https://images.bloniea.com/images1/avatar_error.png",
  avatar_default: "https://images.bloniea.com/images1/default_avatar.png",
  img_404: "https://images.bloniea.com/images1/404.jpg",
  logo_url: "https://images.bloniea.com/images1/logo.png",
  auth: {
    gitee: {
      client_id:
        "4a5503cddc755a561c01b98f87589d4373f23d2a29d36d4d2eaf6e65ad9f8b63",
      client_secret:
        "be98a59cc0836f3cf23a72c83dd16a37f9b66000cfbb984ebd592a0a7e9931e8",
      oauth_api: "https://gitee.com/oauth/",
      oauth_api_p: "/gitee_api/",
      token: "token",
      api: "https://gitee.com/api/v5/",
    },
    github: {
      client_id: "3cc3fe9a9b02c3c327ac",
      client_secret: "7e82548ab0ab1c17abf5cd9883850755dcc03c6f",
      oauth_api: "https://github.com/login/oauth/",
      oauth_api_p: "/github_api/",
      token: "access_token",
      api: "https://api.github.com/",
    },
    // redirect_uri: 'http://localhost:3000/',
    redirect_uri: "https://bloniea.com/",
  },
  aboutTitles: [
    {
      title:
        'bloniea <span style="text-decoration:line-through">一个全栈工程师</span>前端小白',
    },
    { title: "百合骑士团团长" },
    { title: "何以解忧,唯有百合" },
    { title: "联系邮箱:bloniea@qq.com" },
  ],
  contacts: [
    {
      url: "https://gitee.com/bloniea",
      img_url: "https://images.bloniea.com/images1/gitee.png",
    },
    {
      url: "https://github.com/bloniea",
      img_url: "https://images.bloniea.com/images1/GitHub.png",
    },
  ],
  tools: [
    {
      img_url: "https://images.bloniea.com/images1/1000-2.jpg",
      router_name: "tool/reg",
      title: "正则表达式",
      subtitle: "在线测试正则表达式",
      id: 1,
    },
    {
      img_url: "https://images.bloniea.com/images1/1000-4.jpg",
      router_name: "tool/qrcode",
      title: "二维码生成",
      subtitle: "在线生成二维码",
      id: 2,
    },
    {
      img_url: "https://images.bloniea.com/images1/1000-6.jpg",
      router_name: "tool/ico",
      title: "图片转ico格式",
      subtitle: "在线图片转换ico格式",
      id: 3,
    },
  ],
  api: "https://blog.api.bloniea.com/open/v1/",
  algoliaApid: "NYDGZLWU8E",
  algoliaApiKey: "a23d7155175ea1f03f65d39e3fa8be8a",
  algoliaIndexName: "myblog",
}
