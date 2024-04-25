import { getArticlesApi } from "~/utils/fetch"
import { config } from "~/utils/config"
import QS from "qs"
export default defineSitemapEventHandler(async () => {
  try {
    const req = {
      pages: 2,
      pageNumber: 1,
    }
    type RoutesData = { _path: string; modifiedAt: Date }
    type DataJson = {
      success: number
      message: string
      data?: any
    }
    let allDynamicRoutes: RoutesData[] = []
    let hasNextPage = true
    while (hasNextPage) {
      const url = config.api + "articles?" + QS.stringify(req)
      console.log(req.pageNumber)
      const res = await fetch(url)
      if (res.status !== 200) hasNextPage = false
      const articles: DataJson = await res.json()

      console.log(articles)
      if (articles && articles.success === 1) {
        const dynamicRoutes = articles.data.result.map(
          (item: { article_id: number }) => ({
            // _path: `/article?id=${item.article_id}`,
            _path: `${config.url}/api/article/${item.article_id}`,
            modifiedAt: new Date(),
          })
        )
        allDynamicRoutes = allDynamicRoutes.concat(dynamicRoutes)
        // 假设 articleIds.length < pageSize 时表示没有下一页了
        hasNextPage = !(articles.data.result.length < req.pages)
        req.pageNumber++
      } else {
        hasNextPage = false
      }
    }
    const posts = await Promise.all(allDynamicRoutes)
    return posts.map((p: any) => {
      return {
        loc: p._path,
        lastmod: p.modifiedAt,
      }
    })
  } catch (e) {
    console.log(e)
  }
})
