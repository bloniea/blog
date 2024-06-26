export default defineNuxtRouteMiddleware((to, from) => {
  if (!to.matched.length) {
    return navigateTo("/404")
  }
  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  //   if (to.path !== "/") {
  //     return navigateTo("/")
  //   }
})
