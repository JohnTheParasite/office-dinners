import JsCookieMin from "js-cookie/dist/js.cookie.min.mjs"
import { Websockets } from "@/services/synchronization/websockets"
import i18n from "@/i18n"

export default class AuthService {
  static authKey = "user"
  static isAuthenticated = () => {
    return localStorage.getItem(AuthService.authKey)
  }
  static loginUser = (userData) => {
    localStorage.setItem(AuthService.authKey, userData)
    JsCookieMin.set("x-token", AuthService.getUserData().token)
    Websockets.connect()
    i18n.locale = JSON.parse(userData).language
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
  static getUserLanguage = () => {
    if (this.isAuthenticated()) {
      return this.getUserData().language
    }
    return process.env.VUE_APP_I18N_LOCALE
  }
}
