<template>
  <b-modal :id="'b' + _uid" centered header-class="warning" no-close-on-backdrop>
    <template #modal-header="{ close }">
      <h5>{{ $t("refill.setBalance") }}</h5>
      <form-button :disabled="loadInProgress" class="close" type="secondary" @click="close">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </form-button>
    </template>
    <div class="content">
      <div class="discount-area">
        <div class="discount-input">
          <text-input type="number" @input="onChange('balance', $event)"></text-input>
        </div>
      </div>
    </div>
    <template #modal-footer="{ cancel }">
      <form-button :disabled="loadInProgress" label="interface.cancel" type="secondary" @click="cancel" />
      <form-button :disabled="!verified || loadInProgress" label="interface.OK" type="warning" @click="() => apply(userId, balance)" />
    </template>
  </b-modal>
</template>

<script>
import FormButton from "@/components/controls/FormButton"
import TextInput from "@/components/controls/TextInput"

export default {
  name: "RefillFormModal",
  components: { TextInput, FormButton },
  props: {
    apply: Function,
    loadInProgress: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      balance: "0",
      userId: undefined
    }
  },
  methods: {
    show(userId) {
      this.userId = userId
      this.balance = "0"
      this.$bvModal.show("b" + this._uid)
    },
    hide() {
      this.$bvModal.hide("b" + this._uid)
    },
    onChange(field, value) {
      this[field] = value
    }
  },
  computed: {
    verified() {
      return this.balance !== "0"
    }
  }
}
</script>
