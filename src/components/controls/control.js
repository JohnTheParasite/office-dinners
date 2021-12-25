import i18n from "@/i18n"

export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      errorMessage: ""
    }
  },
  computed: {
    hasError() {
      return this.errorMessage.length
    },
    getTranslatedLabel() {
      return i18n.t(this.label)
    },
    getLabel() {
      let label = this.getTranslatedLabel
      if (this.required) {
        label = "<span>" + label + '<span class="required-star">*</span></span>'
      }
      return label
    }
  }
}
