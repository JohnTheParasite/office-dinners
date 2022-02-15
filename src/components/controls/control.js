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
    },
    readonly: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ""
    },
    initValue: {}
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
    },
    hasLabel() {
      return this.getLabel.length > 0
    }
  },
  methods: {
    change(event) {
      this.errorMessage = ""
      this.$emit("change", this.value, this, event)
    }
  }
}
