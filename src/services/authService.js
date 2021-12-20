export default class AuthService {
  authKey = "user"
  static isAuthenticated = () => {
    return localStorage.getItem(this.authKey)
  }
  static loginUser = (userData) => {
    localStorage.setItem(this.authKey, userData)
  }
  static logoutUser = () => {
    localStorage.removeItem(this.authKey)
  }
  static getUserData = () => {
    return JSON.parse(localStorage.getItem(this.authKey))
  }
}
