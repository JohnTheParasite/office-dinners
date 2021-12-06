export default {
  namespaced: true,
  state: {
    errors: []
  },
  mutations: {
    addErrors: (state, errors) => {
      state.errors = errors
    }
  }
}
