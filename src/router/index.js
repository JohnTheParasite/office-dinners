import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import AuthService from "@/services/authService"
import User from "@/views/User"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/user",
    name: "user",
    component: User
  },
  {
    path: "/cafe",
    name: "cafe",
    component: User
  },
  {
    path: "/refills",
    name: "refills",
    component: User
  },
  {
    path: "/orders",
    name: "orders",
    component: User
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    beforeEnter: (to, from, next) => {
      if (AuthService.isAuthenticated()) {
        next({ name: "Home" })
      } else next()
    }
  },
  {
    path: "*",
    component: () => import("../views/NotFound.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !AuthService.isAuthenticated()) next({ name: "Login" })
  else next()
})

export default router
