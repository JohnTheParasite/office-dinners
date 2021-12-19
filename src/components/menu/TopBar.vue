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
.top-bar {
  padding: 0.8rem 1rem;
  background: white;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  border-radius: 0.428rem;
  display: flex;
  justify-content: space-between;
}
</style>
