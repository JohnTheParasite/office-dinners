import Vue from "vue"
import Vuex from "vuex"
import basic from "./modules/basic"
import toasts from "./modules/toasts"
import dialog from "./modules/dialog"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    basic,
    toasts,
    dialog
  }
})
