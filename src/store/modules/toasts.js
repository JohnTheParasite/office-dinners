import SystemTypes from "@/enums/systemTypes"

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    addDangerToast: (state, notification) => {
      if (typeof notification !== "object") {
        notification = {
          message: notification
        }
      }
      state.list.push({
        ...notification,
        type: SystemTypes.DANGER
      })
    },
    addToast: (state, notification) => {
      state.list.push(notification)
    },
    removeToast: (state, notification) => {
      state.list.splice(state.list.indexOf(notification), 1)
    }
  }
}
