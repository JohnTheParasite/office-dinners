<template>
  <div>
    Login page
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    login: function () {
      this.$authService.loginUser();
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  border: 1px solid blue;
}
</style>
