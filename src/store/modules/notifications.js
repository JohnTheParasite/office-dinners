export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    addNotification: (state, notification) => {
      state.list.push(notification)
    },
    removeNotification: (state, notification) => {
      state.list.splice(state.list.indexOf(notification), 1)
    }
  }
}
