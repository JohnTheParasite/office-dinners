import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Auth } from "@/plugins/auth";

Vue.config.productionTip = false;

Vue.use(Auth);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
