<template>
  <div class="toast-container toaster-top-right" id="toastContainer">
    <toast v-for="(toast, id) in toasts" :key="id" v-bind="toast"></toast>
  </div>
</template>

<script>
import Toast from "@/components/controls/Toast"

export default {
  name: "ToasterContainer",
  components: { Toast },
  data() {
    return {
      toasts: []
    }
  },
  methods: {
    addNotification(parameters) {
      this.toasts.push(parameters)
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
  box-sizing: border-box;
}
</style>
