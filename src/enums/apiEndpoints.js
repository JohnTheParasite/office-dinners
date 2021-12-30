export class ApiEndpoints {
  static LOGIN = process.env.VUE_APP_API_URL + "/login"
  static USER_LIST = process.env.VUE_APP_API_URL + "/user/list"
  static CREATE_USER = process.env.VUE_APP_API_URL + "/user/create"
}
