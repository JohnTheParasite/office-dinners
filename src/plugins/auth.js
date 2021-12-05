import AuthService from "@/services/authService";

export const Auth = {
  install(Vue) {
    Vue.prototype.$authService = AuthService;
  },
};