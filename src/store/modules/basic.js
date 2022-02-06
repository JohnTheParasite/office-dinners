export default {
  namespaced: true,
  state: {
    errors: [],
    votesOpened: false,
    usersList: [],
    currency: ""
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
    }
  },
  actions: {
    setFromHeaderData({ commit }, data) {
      commit("setUsersList", data.usersList)
      commit("setCurrency", data.currency)
    }
  }
}
