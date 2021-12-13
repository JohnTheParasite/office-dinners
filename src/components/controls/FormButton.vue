<template>
  <button :class="getTypeClass" :disabled="disabled" :type="formType" class="btn">
    <template v-if="loadingInProgress">
      <CssLoader></CssLoader>
    </template>
    <template v-else>
      {{ label }}
    </template>
  </button>
</template>

<script>
import CssLoader from "@/components/CssLoader"

export default {
  name: "FormButton",
  components: { CssLoader },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    loadingInProgress: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    formType: {
      type: String,
      default: "button"
    },
    type: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    getTypeClass() {
      return `btn-${this.type}`
    }
  }
}
</script>

<style scoped></style>
