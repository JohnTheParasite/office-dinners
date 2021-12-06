<template>
  <div :class="{ invalid: hasError }" class="form-input">
    <label :for="_uid">
      <span class="input-label" v-show="getLabel" v-html="getLabel"></span>
      <input
        :id="_uid"
        v-model="inputModel"
        :placeholder="placeholder"
        :required="required"
        :type="type"
        @focusin="focusin"
        @focusout="focusout"
        @input="input"
      />
    </label>
  </div>
</template>

<script>
import control from "@/components/controls/control"

export default {
  name: "TextInput",
  mixins: [control],
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      inputModel: "",
      focused: false
    }
  },
  computed: {
    value: {
      get() {
        return this.inputModel
      },
      set(value) {
        this.inputModel = value
      }
    }
  },
  methods: {
    focusin() {
      this.focused = true
      this.errorMessage = ""
    },
    focusout() {
      this.focused = false
      if (this.required && !this.inputModel.length) {
        this.errorMessage = "Field is required"
      }
    },
    input(event) {
      this.errorMessage = ""
      this.$emit("input", this.value, this, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-input {
  &.invalid {
    border: 1px solid red;
  }
}
</style>
