import SystemTypes from "@/enums/systemTypes"

export default {
  namespaced: true,
  state: {
    showDialog: false,
    title: "",
    message: "",
    type: SystemTypes.PRIMARY,
    apply: () => {}
  },
  mutations: {
    openDialog: (state, properties = {}) => {
      state.title = properties.title ?? ""
      state.message = properties.message ?? ""
      state.type = properties.type ?? SystemTypes.PRIMARY
      if (properties.apply !== undefined) {
        state.apply = properties.apply
      }
      state.showDialog = true
    },
    hideDialog: (state) => {
      state.showDialog = false
    }
  }
}
