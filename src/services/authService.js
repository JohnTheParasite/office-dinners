export default class AuthService {
  static isAuthenticated = () => {
    return localStorage.getItem("user")
  }
  static loginUser = (token) => {
    localStorage.setItem("user", token)
  }
  static logoutUser = () => {
    localStorage.removeItem("user")
  }
}
