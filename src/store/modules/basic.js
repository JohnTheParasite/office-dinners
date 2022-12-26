export default {
  namespaced: true,
  state: {
    errors: [],
    votesOpened: false,
    autoCloseTime: "",
    usersList: [],
    currency: "",
    isAdmin: false,
    avatar: ""
  },
  mutations: {
    addErrors: (state, errors) => {
      state.errors = errors
    },
    isVotesOpened: (state, value) => {
      state.votesOpened = value
    },
    setUsersList: (state, usersList) => {
      state.usersList = usersList
    },
    setCurrency: (state, value) => {
      state.currency = value
    },
    setAutoCloseTime: (state, value) => {
      state.autoCloseTime = value
    },
    setIsAdmin: (state, value) => {
      state.isAdmin = value
    },
    setAvatar: (state, value) => {
      state.avatar = value
    }
  },
  actions: {
    setFromHeaderData({ commit }, data) {
      commit("setUsersList", data.usersList)
      commit("setCurrency", data.currency)
      commit("setAutoCloseTime", data.autoCloseTime)
      commit("setIsAdmin", data.isAdmin)
      commit("setAvatar", data.avatar)
    }
  }
}
