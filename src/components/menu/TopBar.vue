<template>
  <div class="top-bar-container">
    <div class="top-bar">
      <order-menu />
      <user-menu></user-menu>
    </div>
  </div>
</template>

<script>
import UserMenu from "@/components/menu/UserMenu"
import OrderMenu from "@/components/menu/OrderMenu"

export default {
  name: "TopBar",
  components: { OrderMenu, UserMenu }
}
</script>

<style lang="scss" scoped>
@import "../../scss/components/color";

.top-bar-container {
  margin: 2rem 2rem 0;
  background: $light-grey;
  position: sticky;
  top: 2rem;
  z-index: 22;
}

.top-bar {
  padding: 0.8rem 1rem;
  background: $white;
  box-shadow: $box-shadow;
  border-radius: 0.428rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
</style>
