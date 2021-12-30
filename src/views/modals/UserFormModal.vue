<template>
  <b-modal id="AddUserModal" centered :header-class="variation">
    <template #modal-header="{ close }">
      <h5>{{ $t(title) }}</h5>
      <form-button @click="close" type="secondary" class="close">
        <fa-icon icon="close" />
      </form-button>
    </template>
    <checkbox label="Checkbox" />
    <toggle label="Toggler" />
    <radio-list
      :options="[
        { text: 'Текст 1', value: 'Var1', selected: true },
        { text: 'Текст 2', value: 'Var2', selected: false },
        { text: 'Текст 3', value: 'Var3', selected: false }
      ]"
    />
    <text-input placeholder="c'mon mate" />
    <template #modal-footer="{ cancel }">
      <form-button label="Cancel" @click="cancel" type="secondary"></form-button>
      <form-button label="Create" @click="create()" :type="variation"></form-button>
    </template>
  </b-modal>
</template>

<script>
import Checkbox from "@/components/controls/Checkbox"
import Toggle from "@/components/controls/Toggle"
import RadioList from "@/components/controls/RadioList"
import TextInput from "@/components/controls/TextInput"
import FormButton from "@/components/controls/FormButton"
import SystemTypes from "@/enums/systemTypes"
import FaIcon from "@/components/icons/FaIcon"

export default {
  name: "UserFormModal",
  components: { FaIcon, FormButton, TextInput, RadioList, Toggle, Checkbox },
  props: {
    title: {
      type: String,
      default: ""
    },
    variation: {
      default: SystemTypes.PRIMARY
    }
  },
  methods: {
    show() {
      this.$bvModal.show("AddUserModal")
    },
    create() {
      console.log("create()")
    }
  }
}
</script>
