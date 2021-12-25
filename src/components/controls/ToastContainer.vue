<template>
  <div id="toastContainer" class="toast-container toaster-top-right">
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
  top: 0;
  z-index: 200000;
  transition: all 25s ease;
  padding: 10px 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  right: 0;
  flex-direction: column-reverse;
}
</style>
