<template>
  <div class="toast-container toaster-top-right" id="toastContainer">
    <toast v-for="(toast, id) in getToasts" :key="id" :toast="toast"></toast>
  </div>
</template>

<script>
import Toast from "@/components/controls/Toast"

export default {
  name: "ToasterContainer",
  components: { Toast },
  computed: {
    getToasts() {
      return this.$store.state.notifications.list
    }
  }
}
</script>

<style lang="scss" scoped>
.toaster-top-right {
  position: fixed;
  height: 0;
  overflow: visible;
  top: 1rem;
  right: 1rem;
  width: 350px;
  z-index: 1;
  box-sizing: border-box;
}
</style>
