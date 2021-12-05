<template>
  <div>
    Login page
    {{ errors }}
    <button @click="login">Login</button>
    <button @click="testErrors">Test Errors</button>
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
    testErrors: function () {
      this.$store.commit("global/addErrors", ["a"]);
    },
  },
  computed: {
    errors: function () {
      return this.$store.state.global.errors;
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  border: 1px solid blue;
}
</style>
