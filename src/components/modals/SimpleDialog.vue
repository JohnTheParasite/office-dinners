<template>
  <b-modal :id="'b' + _uid" :header-class="type" centered no-close-on-backdrop @hidden="setInStore">
    <template #modal-header="{ close }">
      <h5>{{ $t(title) }}</h5>
      <form-button class="close" type="secondary" @click="close">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </form-button>
    </template>
    <div class="content" v-html="$t(message)"></div>
    <template #modal-footer="{ cancel }">
      <form-button label="interface.cancel" type="secondary" @click="cancel" />
      <form-button :type="type" label="interface.OK" @click="apply" />
    </template>
  </b-modal>
</template>

<script>
import FormButton from "@/components/controls/FormButton"
import { mapState } from "vuex"

export default {
  name: "SimpleDialog",
  components: { FormButton },
  computed: {
    ...mapState("dialog", ["message", "title", "showDialog", "type", "apply"])
  },
  watch: {
    ["showDialog"](open) {
      if (open) {
        this.show()
      } else {
        this.$bvModal.hide("b" + this._uid)
      }
    }
  },
  methods: {
    show() {
      this.$bvModal.show("b" + this._uid)
    },
    hide() {
      this.$bvModal.hide("b" + this._uid)
      this.setInStore()
    },
    setInStore() {
      this.$store.commit("dialog/hideDialog")
    }
  }
}
</script>
