import Vue from "vue"
import Vuex from "vuex"
import global from "./modules/global"
import toasts from "./modules/toasts"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    global,
    toasts
  }
})
