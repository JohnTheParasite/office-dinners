import SystemTypes from "@/enums/systemTypes"

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    addDangerNotification: (state, notification) => {
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
    addNotification: (state, notification) => {
      state.list.push(notification)
    },
    removeNotification: (state, notification) => {
      state.list.splice(state.list.indexOf(notification), 1)
    }
  }
}
