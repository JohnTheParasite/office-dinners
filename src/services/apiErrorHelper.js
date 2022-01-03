import AuthService from "@/services/authService"

export default {
  methods: {
    processErrorCode(errorCode) {
      let errorMessage = "errors.serverError"
      if (errorCode === 401) {
        errorMessage = "errors.youWasLoggedOut"
        AuthService.logoutUser()
        this.$router.push("/")
      } else if (errorCode === 403) {
        errorMessage = "errors.forbidden"
        this.$router.push("/")
      } else if (errorCode === 404) {
        errorMessage = "errors.pageNotFound"
      }
      this.$store.commit("toasts/addDangerToast", errorMessage)
    },
    catchAxiosError(error) {
      if (error.response) {
        this.processErrorCode(error.response.data.status)
      } else if (error.request) {
        this.$store.commit("toasts/addDangerToast", error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        this.$store.commit("toasts/addDangerToast", "errors.serverError")
      }
    }
  }
}
