<template>
  <div class="lds-dual-ring"></div>
</template>

<script>
export default {
  name: "CssLoader"
}
</script>

<style lang="scss" scoped>
@import "../scss/components/color";

.lds-dual-ring {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  border: 3px solid;
  border-color: $white transparent $white transparent;
  animation: lds-dual-ring 1.5s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
