export default {
  data() {
    return {
      showOpenable: false
    }
  },
  methods: {
    toggleOpenable() {
      this.showOpenable = !this.showOpenable
    },
    closeOpenable() {
      this.showOpenable = false
    },
    onDocumentClick(e) {
      let element = e.target

      while (element) {
        if (element === this.$el) {
          return
        }
        element = element.parentNode
      }
      this.closeOpenable()
    }
  },
  mounted() {
    document.addEventListener("click", this.onDocumentClick)
  }
}
