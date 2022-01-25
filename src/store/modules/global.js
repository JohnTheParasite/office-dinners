export default {
  namespaced: true,
  state: {
    errors: [],
    votesOpened: false
  },
  mutations: {
    addErrors: (state, errors) => {
      state.errors = errors
    },
    isVotesOpened: (state, value) => {
      state.votesOpened = value
    }
  }
}
