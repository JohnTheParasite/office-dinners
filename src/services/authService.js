export default class AuthService {
  static authKey = "user"
  static isAuthenticated = () => {
    return localStorage.getItem(AuthService.authKey)
  }
  static loginUser = (userData) => {
    localStorage.setItem(AuthService.authKey, userData)
  }
  static logoutUser = () => {
    localStorage.removeItem(AuthService.authKey)
  }
  static getUserData = () => {
    return JSON.parse(localStorage.getItem(AuthService.authKey))
  }
  static isAdministrator = () => {
    return AuthService.getUserData().roleId < 2
  }
}
