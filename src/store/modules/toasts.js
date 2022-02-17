import SystemTypes from "@/enums/systemTypes"

export default {
  namespaced: true,
  state: {
    list: [],
    timeoutIdList: []
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
        type: SystemTypes.DANGER,
        header: "errors.error"
      })
    },
    addSuccessToast: (state, notification) => {
      if (typeof notification !== "object") {
        notification = {
          message: notification
        }
      }
      state.list.push({
        ...notification,
        type: SystemTypes.SUCCESS,
        header: "interface.success"
      })
    },
    addToast: (state, notification) => {
      state.list.push(notification)
    },
    removeToast: (state, notification) => {
      state.list.splice(state.list.indexOf(notification), 1)
    },
    clearList: (state) => {
      state.list = []
    },
    addTimeoutId: (state, id) => {
      state.timeoutIdList.push(id)
    },
    clearTimeoutsList: (state) => {
      state.timeoutIdList = []
    }
  },
  actions: {
    removeAllToasts({ commit }) {
      commit("clearList")
    },
    addTimeoutIdToList({ commit }, id) {
      commit("addTimeoutId", id)
    },
    deleteTimeoutsFromList({ commit }) {
      commit("clearTimeoutsList")
    }
  }
}
