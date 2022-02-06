<template>
  <b-modal :id="'b' + _uid" centered header-class="warning" no-close-on-backdrop>
    <template #modal-header="{ close }">
      <h5>{{ $t("order.setDiscount") }}</h5>
      <form-button class="close" type="secondary" @click="close">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </form-button>
    </template>
    <div class="content">
      <div class="discount-area">
        <div class="discount-input">
          <text-input type="number" @input="onChange('discount', $event)"></text-input>
        </div>
        <toggle :init-value="percent" label="interface.percent" @change="onChange('percent', $event)"></toggle>
      </div>
    </div>
    <template #modal-footer="{ cancel }">
      <form-button label="Cancel" type="secondary" @click="cancel" />
      <form-button label="OK" type="warning" @click="() => apply(discount, percent)" />
    </template>
  </b-modal>
</template>

<script>
import FormButton from "@/components/controls/FormButton"
import TextInput from "@/components/controls/TextInput"
import Toggle from "@/components/controls/Toggle"

export default {
  name: "OrderDiscountModal",
  components: { Toggle, TextInput, FormButton },
  props: {
    apply: Function
  },
  data() {
    return {
      discount: 0,
      percent: false
    }
  },
  methods: {
    show() {
      this.discount = 0
      this.percent = false
      this.$bvModal.show("b" + this._uid)
    },
    hide() {
      this.$bvModal.hide("b" + this._uid)
    },
    onChange(field, value) {
      this[field] = value
    }
  }
}
</script>

<style scoped></style>
