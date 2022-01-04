export class ApiEndpoints {
  static LOGIN = process.env.VUE_APP_API_URL + "/login"
  static USER_LIST = process.env.VUE_APP_API_URL + "/user/list"
  static CAFE_LIST = process.env.VUE_APP_API_URL + "/cafe/list"
  static TOGGLE_CAFE = process.env.VUE_APP_API_URL + "/cafe/toggle"
}
