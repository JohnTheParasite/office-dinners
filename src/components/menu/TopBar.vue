<template>
  <div class="top-bar">
    <div></div>
    <user-menu></user-menu>
  </div>
</template>

<script>
import UserMenu from "@/components/menu/UserMenu"

export default {
  name: "TopBar",
  components: { UserMenu }
}
</script>

<style lang="scss" scoped>
@import "../../scss/components/color";

.top-bar {
  padding: 0.8rem 1rem;
  background: white;
  box-shadow: 0 4px 24px 0 rgba($black-border-color, 5%);
  border-radius: 0.428rem;
  display: flex;
  justify-content: space-between;
}
</style>
