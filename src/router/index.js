import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import AuthService from "@/services/authService"
import User from "@/views/User"
import Cafe from "@/views/Cafe"
import Orders from "@/views/Orders"
import Refills from "@/views/Refills"

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
    component: Cafe
  },
  {
    path: "/refills",
    name: "refills",
    component: Refills
  },
  {
    path: "/orders",
    name: "orders",
    component: Orders
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
