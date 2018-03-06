import store from "../store"

export default (to, from, next) => {
  console.log("authguard")
  if (store.getters.user) {
    next()
  } else {
    next("/")
  }
}
