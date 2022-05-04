<template>
  <div id="toastContainer" class="toaster">
    <toast v-for="(toast, id) in getToasts" :key="id" v-bind="toast"></toast>
  </div>
</template>

<script>
import Toast from "@/components/controls/Toast"

export default {
  name: "ToasterContainer",
  components: { Toast },
  computed: {
    getToasts() {
      return this.$store.state.toasts.list
    }
  }
}
</script>

<style lang="scss" scoped>
.toaster {
  position: fixed;
  top: 0;
  z-index: 200000;
  transition: all 25s ease;
  padding: 10px 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  right: 10px;
  flex-direction: column-reverse;

  @media screen and (max-width: 360px) {
    width: 100%;
    padding-left: 1.5rem;
  }
}
</style>
