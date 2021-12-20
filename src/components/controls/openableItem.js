export default {
  methods: {
    closeOpenable: () => {},
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
