<template>
  <div id="app">
    <menu-container v-if="showMenu"></menu-container>
    <div class="content-container">
      <top-bar v-if="showMenu"></top-bar>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import "scss/core.scss";

#app {
  display: flex;
}

.content-container {
  padding: 2rem 2rem 0;
  width: 100%;
}
</style>
<script>
import MenuContainer from "@/components/menu/MenuContainer"
import TopBar from "@/components/menu/TopBar"

export default {
  components: { TopBar, MenuContainer },
  computed: {
    showMenu() {
      return this.$route.name !== "Login"
    }
  }
}
</script>
