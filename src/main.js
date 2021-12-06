import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Auth } from "@/plugins/auth";
import { Store } from "@/plugins/store";
import { AxiosPlugin } from "@/plugins/axios";

Vue.config.productionTip = false;

Vue.use(Auth);
Vue.use(Store);
Vue.use(AxiosPlugin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
