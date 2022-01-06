<template>
  <text-input
    :label="label"
    :icon="passwordInput.icon"
    :on-icon-click="toggleElementType"
    :type="passwordInput.type"
    :init-value="initValue"
    @input="emitInput"
    :required="required"
  />
</template>

<script>
import InputTypes from "@/enums/inputTypes"
import IconNames from "@/enums/iconNames"
import TextInput from "@/components/controls/TextInput"

export default {
  name: "PasswordInput",
  components: { TextInput },
  mixins: [TextInput],
  props: {
    label: {
      type: String,
      default: "password"
    }
  },
  data() {
    return {
      passwordInput: {
        type: InputTypes.PASSWORD,
        icon: IconNames.EYE
      }
    }
  },
  methods: {
    toggleElementType() {
      this.passwordInput.icon = this.passwordInput.type === InputTypes.PASSWORD ? IconNames.EYE_SLASH : IconNames.EYE
      this.passwordInput.type = this.passwordInput.type === InputTypes.PASSWORD ? InputTypes.TEXT : InputTypes.PASSWORD
    },
    emitInput(event) {
      this.$emit("input", event, this)
    }
  }
}
</script>
