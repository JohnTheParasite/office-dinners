<template>
  <div class="menu-container">
    <div class="upper-menu">
      <div class="logo">Dinners</div>
      <menu-item icon="fa-chart-line" router-name="Home" title="menu.dashboard"></menu-item>
      <menu-item icon="fa-users" router-name="user" title="menu.users"></menu-item>
      <menu-item icon="fa-burger" router-name="cafe" title="menu.cafeList"></menu-item>
      <menu-item v-if="$authService.isAdministrator()" icon="fa-hand-holding-dollar" router-name="refills" title="menu.refills"></menu-item>
      <menu-item icon="fa-utensils" router-name="orders" title="menu.orders"></menu-item>
    </div>
    <div class="footer-part">
      <countdown-timer :auto-close-date="$store.state.basic.autoCloseTime" />
    </div>
  </div>
</template>

<script>
import MenuItem from "@/components/menu/MenuItem"
import CountdownTimer from "../CountdownTimer.vue"

export default {
  name: "MenuContainer",
  components: { MenuItem, CountdownTimer }
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
  box-shadow: 0 0 15px 0 rgba($black-border-color, 5%);
  font-size: 1.1rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .logo {
    padding: 2rem;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
}
</style>
