<template>
  <form class="login-form" ref="form" @submit="login">
    <div class="auth-wrapper">
      <text-input :required="true" label="username" @input="onInput('username', $event)"></text-input>
      <text-input :required="true" label="password" type="password" @input="onInput('password', $event)"></text-input>
      {{ errorMessage }}
      <button type="submit">Login</button>
    </div>
  </form>
</template>

<script>
import TextInput from "@/components/controls/TextInput"

export default {
  name: "Login",
  components: { TextInput },
  data() {
    return {
      username: "",
      password: "",
      errorMessage: ""
    }
  },
  methods: {
    onInput(field, value) {
      this.errorMessage = ""
      this[field] = value
    },
    login(event) {
      if (!this.$refs.form.checkValidity()) {
        return
      }
      this.errorMessage = ""
      event.preventDefault()
      event.stopImmediatePropagation()
      let formData = new FormData()
      formData.append("username", this.username)
      formData.append("password", this.password)
      this.$axios
        .post("http://94.152.212.14:7764/login", formData)
        .then((response) => {
          this.$authService.loginUser(response.data.token)
          this.$router.push("/")
        })
        .catch(() => {
          this.errorMessage = "Incorrect login or password"
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/scss/page-auth.scss";
</style>
