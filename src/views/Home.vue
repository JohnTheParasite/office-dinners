<template>
  <div class="home">
    Home page
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  methods: {
    logout: function () {
      this.$authService.logoutUser()
      this.$router.push("login")
    }
  }
}
</script>
