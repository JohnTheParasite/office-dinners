<template>
  <div class="menu-container">
    <div class="logo">Dinners</div>
    <menu-item icon="columns" router-name="Home" title="Dashboard"></menu-item>
    <menu-item icon="envelope" router-name="user" title="Users"></menu-item>
    <menu-item icon="coffee" router-name="cafe" title="Cafe list"></menu-item>
    <menu-item icon="credit-card" router-name="refills" title="Refills"></menu-item>
    <menu-item icon="folder" router-name="orders" title="Orders"></menu-item>
  </div>
</template>

<script>
import MenuItem from "@/components/menu/MenuItem"

export default {
  name: "MenuContainer",
  components: { MenuItem }
}
</script>

<style lang="scss" scoped>
@import "../../scss/components/color";

.menu-container {
  position: sticky;
  top: 0;
  width: 260px;
  left: 0;
  background: $white;
  height: 100vh;
  box-shadow: 0 0 15px 0 rgb(34 41 47 / 5%);
  font-size: 1.1rem;

  .logo {
    padding: 2rem;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
}
</style>
