import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import { Auth } from "@/plugins/auth"
import { Store } from "@/plugins/store"
import { AxiosPlugin } from "@/plugins/axios"
import { BootstrapVue } from "bootstrap-vue"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.config.productionTip = false

Vue.use(Auth)
Vue.use(Store)
Vue.use(AxiosPlugin)
Vue.use(BootstrapVue)

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app")
