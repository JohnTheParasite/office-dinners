export class ApiEndpoints {
  static LOGIN = process.env.VUE_APP_API_URL + "/login"
  static USER_LIST = process.env.VUE_APP_API_URL + "/user/list"
  static CREATE_USER = process.env.VUE_APP_API_URL + "/user/create"
  static USER_DATA = process.env.VUE_APP_API_URL + "/user/update"
  static USER_REFILLS = process.env.VUE_APP_API_URL + "/user/refills"
  static USER_REFILL = process.env.VUE_APP_API_URL + "/user/refill"
  static CAFE_LIST = process.env.VUE_APP_API_URL + "/cafe/list"
  static CAFE_TOTAL_VOTES = process.env.VUE_APP_API_URL + "/cafe/total-votes"
  static TOGGLE_CAFE = process.env.VUE_APP_API_URL + "/cafe/toggle"
  static CREATE_CAFE = process.env.VUE_APP_API_URL + "/cafe/create"
  static CAFE_DATA = process.env.VUE_APP_API_URL + "/cafe/update"
  static CAFE_COMMENTS = process.env.VUE_APP_API_URL + "/comment/cafe"
  static CREATE_COMMENT = process.env.VUE_APP_API_URL + "/comment/add"
  static VOTE = process.env.VUE_APP_API_URL + "/cafe/vote"
  static CAFE_HEADER = process.env.VUE_APP_API_URL + "/cafe/header-data"
  static VOTES_OPEN = process.env.VUE_APP_API_URL + "/cafe/open-votes"
  static VOTES_CLOSE = process.env.VUE_APP_API_URL + "/cafe/close-votes"
  static VOTES_AUTOCLOSE = process.env.VUE_APP_API_URL + "/cafe/set-auto-close-time"
  static VOTES_AUTOCLOSE_OFF = process.env.VUE_APP_API_URL + "/cafe/off-auto-close-time"
  static ORDER_ADD = process.env.VUE_APP_API_URL + "/cafe/add-order"
  static ORDER_CHANGE = process.env.VUE_APP_API_URL + "/order/change-order"
  static ORDERS_GET = process.env.VUE_APP_API_URL + "/order/get-for-date"
  static SET_ORDER_USER_TO_PAY = process.env.VUE_APP_API_URL + "/order/select-user-to-pay"
  static CLOSE_ORDER = process.env.VUE_APP_API_URL + "/order/close-order"
  static OPEN_ORDER = process.env.VUE_APP_API_URL + "/order/open-order"
  static SET_ORDER_ORDERED = process.env.VUE_APP_API_URL + "/order/set-ordered"
  static DELETE_ORDER = process.env.VUE_APP_API_URL + "/order/delete"
  static UPDATE_ORDER_PRICES = process.env.VUE_APP_API_URL + "/order/update-order-prices"
  static SET_ORDER_DISCOUNT = process.env.VUE_APP_API_URL + "/order/set-order-discount"
}
