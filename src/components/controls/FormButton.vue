<template>
  <button :class="getTypeClass" :disabled="disabled" :type="formType" class="btn" @click="onclick">
    <template v-if="loadingInProgress">
      <CssLoader></CssLoader>
    </template>
    <template v-else>
      {{ $t(label) }}
    </template>
    <slot />
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
  methods: {
    onclick(event) {
      this.$emit("click", event)
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
