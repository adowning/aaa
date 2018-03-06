import Vue from "vue"
import VueRouter from "vue-router"

import routes from "./routes"
import store from "../store"
Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes,
})
Router.beforeEach((to, from, next) => {
  if (to.path != "/") {
    if (store.getters.user) {
      console.log("There is a user, resume. (" + to.path + ")")
      next()
    } else {
      console.log("There is no user, redirect to login. (" + to.path + ")")
      next("/")
    }
  } else {
    console.log("You're on the login page")
    next() // This is where it should have been
  }
})
console.log(Router.mode)
export default Router
