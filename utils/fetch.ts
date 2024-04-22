const api = "/api"
import QS from "qs"
export type DataJson = {
  success: number
  message: string
  data?: any
}
export const fetchApi = async (url: string, options: any = {}) => {
  try {
    if ((!options.method || options.method == "get") && options.params)
      url = url + "?" + QS.stringify(options.params)

    const data = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
    const dataJson: DataJson = await data.json()
    return dataJson
  } catch (error) {
    console.log(error)
  }
}

// 获取所有友链
export const getFriendsApi = async (params: any) => {
  const url = api + "/friends"
  return await fetchApi(url, { params: params })
}
// 获取所有分类
export const getCategoriesApi = async (params: any) => {
  const url = api + "/categories"
  return await fetchApi(url, { params: params })
}
export const getCategoryApi = async (id: string | number, params: any) => {
  const url = api + "/category/" + id
  return await fetchApi(url, { params: params })
}
// 获取单篇文章
export const getArticleApi = async (id: string | number) => {
  const url = api + "/article/" + id
  return await fetchApi(url)
}
// 获取所有文章
export const getArticlesApi = async (params: {
  pages: number
  pageNumber: number
}) => {
  const url = api + "/articles"
  return await fetchApi(url, { params: params })
}

// 获取评论
export const getCommentsApi = async (id: string | number, params: any) => {
  const url = api + "/comments/" + id
  return await fetchApi(url, { params: params })
}

// 获取关于我的文章
export const getAboutArticles = async (params: any) => {
  const url = api + "/aboutArticles"
  return await fetchApi(url, { params: params })
}

// 获取所有动漫
export const getAboutAnimesApi = async (params: any) => {
  const url = api + "/animes"
  return await fetchApi(url, { params: params })
}

// 获取动漫信息
export const getAnimeApi = async (id: string | number, params: any) => {
  const url = api + "/anime/" + id
  return await fetchApi(url, { params: params })
}
