<template>
  <b-modal :id="'b' + _uid" :header-class="buttonVariant" centered no-close-on-backdrop>
    <template #modal-header="{ close }">
      <h5>{{ $t(title) }}</h5>
      <form-button class="close" type="secondary" @click="close">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </form-button>
    </template>
    <div class="content">
      {{ $t(content) }}
      <slot></slot>
    </div>
    <template #modal-footer="{ cancel }">
      <form-button label="Cancel" type="secondary" @click="cancel" />
      <form-button :type="buttonVariant" label="OK" @click="apply" />
    </template>
  </b-modal>
</template>

<script>
import SystemTypes from "@/enums/systemTypes"
import FormButton from "@/components/controls/FormButton"

export default {
  name: "SimpleDialog",
  components: { FormButton },
  props: {
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    buttonVariant: {
      default: SystemTypes.PRIMARY
    }
  },
  data() {
    return {
      apply: () => {}
    }
  },
  methods: {
    show(apply) {
      this.apply = apply
      this.$bvModal.show("b" + this._uid)
    },
    hide() {
      this.$bvModal.hide("b" + this._uid)
    }
  }
}
</script>

<style scoped></style>
