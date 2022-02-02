<template>
  <b-modal :id="modalId" centered :header-class="buttonVariant" no-close-on-backdrop>
    <template #modal-header="{ close }">
      <h5>{{ $t(title) }}</h5>
      <form-button @click="close" type="secondary" class="close">
        <fa-icon icon="close" />
      </form-button>
    </template>
    <div class="content">
      {{ content }}
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
  name: "modalQuestion",
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
    modalId: {
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
      this.$bvModal.show(this.modalId)
    },
    hide() {
      this.$bvModal.hide(this.modalId)
    }
  }
}
</script>

<style scoped></style>
