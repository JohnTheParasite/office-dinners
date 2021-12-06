import store from "@/store/store"

export const Store = {
  install(Vue) {
    Vue.prototype.$store = store
  }
}
