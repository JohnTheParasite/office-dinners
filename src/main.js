import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Auth } from "@/plugins/auth";
import { Store } from "@/plugins/store";

Vue.config.productionTip = false;

Vue.use(Auth);
Vue.use(Store);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
