<template>
  <b-modal :id="'b' + _uid" :header-class="buttonVariant" centered no-close-on-backdrop>
    <template #modal-header="{ close }">
      <h5>{{ $t(title) }}</h5>
      <form-button @click="close" type="secondary" class="close">
        <fa-icon icon="close" />
      </form-button>
    </template>
    <div class="content">
      {{ $t(content) }}
      <slot></slot>
    </div>
    <template #modal-footer="{ cancel }">
      <form-button label="Cancel" @click="cancel" type="secondary" />
      <form-button label="OK" @click="apply" :type="buttonVariant" />
    </template>
  </b-modal>
</template>

<script>
import SystemTypes from "@/enums/systemTypes"
import FormButton from "@/components/controls/FormButton"
import FaIcon from "@/components/icons/FaIcon"

export default {
  name: "SimpleDialog",
  components: { FaIcon, FormButton },
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
