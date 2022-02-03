export default {
  namespaced: true,
  state: {
    errors: [],
    votesOpened: false,
    usersList: []
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
    }
  },
  actions: {
    setUsersList({ commit }, usersList) {
      commit("setUsersList", usersList)
    }
  }
}
