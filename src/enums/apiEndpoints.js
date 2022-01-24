export class ApiEndpoints {
  static LOGIN = process.env.VUE_APP_API_URL + "/login"
  static USER_LIST = process.env.VUE_APP_API_URL + "/user/list"
  static CREATE_USER = process.env.VUE_APP_API_URL + "/user/create"
  static USER_DATA = process.env.VUE_APP_API_URL + "/user/update"
  static CAFE_LIST = process.env.VUE_APP_API_URL + "/cafe/list"
  static TOGGLE_CAFE = process.env.VUE_APP_API_URL + "/cafe/toggle"
  static CREATE_CAFE = process.env.VUE_APP_API_URL + "/cafe/create"
  static CAFE_DATA = process.env.VUE_APP_API_URL + "/cafe/update"
  static CAFE_COMMENTS = process.env.VUE_APP_API_URL + "/comment/cafe"
  static CREATE_COMMENT = process.env.VUE_APP_API_URL + "/comment/add"
}
