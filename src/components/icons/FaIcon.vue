<template>
  <i :class="iconName" />
</template>

<script>
export default {
  name: "faIcon",
  props: {
    icon: {
      type: String,
      required: true
    },
    cssClass: {
      type: String,
      default: ""
    }
  },
  computed: {
    iconName() {
      return this.cssClass + " adfa-icon fa fa-" + this.icon
    }
  }
}
</script>

<style lang="scss">
.adfa-icon {
  font-size: 18px;
}
</style>
