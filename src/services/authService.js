export default class AuthService {
  static isAuthenticated = () => {
    return localStorage.getItem("user");
  };
  static loginUser = () => {
    localStorage.setItem("user", "user");
  };
  static logoutUser = () => {
    localStorage.removeItem("user");
  };
}
