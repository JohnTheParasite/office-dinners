import JsCookieMin from "js-cookie/dist/js.cookie.min.mjs"
import { Websockets } from "@/services/synchronization/websockets"

export default class AuthService {
  static authKey = "user"
  static isAuthenticated = () => {
    return localStorage.getItem(AuthService.authKey)
  }
  static loginUser = (userData) => {
    localStorage.setItem(AuthService.authKey, userData)
    JsCookieMin.set("x-token", AuthService.getUserData().token)
    Websockets.connect()
  }
  static logoutUser = () => {
    localStorage.removeItem(AuthService.authKey)
    JsCookieMin.remove("x-token")
    Websockets.disconnect()
  }
  static getUserData = () => {
    return JSON.parse(localStorage.getItem(AuthService.authKey))
  }
  static isAdministrator = () => {
    return AuthService.getUserData().roleId < 2
  }
}
