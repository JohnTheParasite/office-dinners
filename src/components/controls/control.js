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
    getLabel() {
      let label = this.label
      if (this.required) {
        label = "<span>" + label + '<span class="required-star">*</span></span>'
      }
      return label
    }
  }
}
