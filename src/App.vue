<template>
  <div id="app">
    <toaster-container />
    <simple-dialog />
    <menu-container v-if="showMenu"></menu-container>
    <div class="content-container">
      <div class="top-shadow"></div>
      <top-bar v-if="showMenu"></top-bar>
      <router-view />
    </div>
  </div>
</template>
<script>
import MenuContainer from "@/components/menu/MenuContainer"
import TopBar from "@/components/menu/TopBar"
import ToasterContainer from "@/components/controls/ToastContainer"
import SimpleDialog from "@/components/modals/SimpleDialog"

export default {
  components: { SimpleDialog, ToasterContainer, TopBar, MenuContainer },
  computed: {
    showMenu() {
      return this.$route.name !== "Login" && this.$route.name !== null
    }
  }
}
</script>

<style lang="scss">
@import "scss/core.scss";

#app {
  display: flex;
}

.content-container {
  width: 100%;
}

.top-shadow {
  background: linear-gradient(180deg, rgba(248, 248, 248, 0.95) 44%, rgba(248, 248, 248, 0.46) 73%, rgba(255, 255, 255, 0));
  left: 0;
  display: block;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
  height: 100px;
}
</style>
