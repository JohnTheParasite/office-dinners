<template>
  <b-modal id="AddUserModal" centered :header-class="variation" no-close-on-backdrop>
    <template #modal-header="{ close }">
      <h5>{{ $t(title) }}</h5>
      <form-button @click="close" type="secondary" class="close">
        <fa-icon icon="close" />
      </form-button>
    </template>
    <text-input label="user.name" :init-value="formGroup.name" @input="onChange('name', $event)" />
    <text-input label="user.surname" :init-value="formGroup.surname" @input="onChange('surname', $event)" />
    <text-input label="email" type="email" :init-value="formGroup.email" @input="onChange('email', $event)" />
    <text-input label="password" type="password" :init-value="formGroup.password" @input="onChange('password', $event)" />
    <radio-list :options="roleOptions" label="user.role" :init-value="formGroup.role" @change="onChange('role', $event)" />
    <select-input
      :options="languageOptions"
      label="user.preferredLanguage"
      :init-value="formGroup.selected_language"
      @change="onChange('selected_language', $event)"
    />
    <checkbox label="user.active" :init-value="formGroup.active" @change="onChange('role', $event)" />
    <template #modal-footer="{ cancel }">
      <form-button label="Cancel" @click="cancel" type="secondary"></form-button>
      <form-button label="Create" @click="create()" :type="variation"></form-button>
    </template>
  </b-modal>
</template>

<script>
import TextInput from "@/components/controls/TextInput"
import FormButton from "@/components/controls/FormButton"
import SystemTypes from "@/enums/systemTypes"
import FaIcon from "@/components/icons/FaIcon"
import RadioList from "@/components/controls/RadioList"
import Checkbox from "@/components/controls/Checkbox"
import SelectInput from "@/components/controls/SelectInput"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import FormDataService from "@/services/formDataService"
import ApiErrorHelper from "@/services/apiErrorHelper"

export default {
  name: "UserFormModal",
  components: { SelectInput, Checkbox, RadioList, FaIcon, FormButton, TextInput },
  mixins: [ApiErrorHelper],
  props: {
    title: {
      type: String,
      default: ""
    },
    variation: {
      default: SystemTypes.PRIMARY
    }
  },
  data() {
    return {
      formGroup: {
        email: "",
        password: "",
        name: "",
        surname: "",
        active: true,
        selected_language: "pl",
        role: 2
      }
    }
  },
  methods: {
    show() {
      this.$bvModal.show("AddUserModal")
    },
    onChange(field, value) {
      this.formGroup[field] = value
    },
    create() {
      this.$axios
        .post(ApiEndpoints.CREATE_USER, FormDataService.getFormData(this.formGroup))
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "user.created")
        })
        .catch((error) => {
          if (error.response) {
            this.processErrorCode(error.response.data.status)
          } else if (error.request) {
            this.$store.commit("toasts/addDangerToast", error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            this.$store.commit("toasts/addDangerToast", "errors.serverError")
          }
        })
    }
  },
  computed: {
    roleOptions() {
      return [
        { text: "user.superAdmin", value: 0, selected: false },
        { text: "user.admin", value: 1, selected: false },
        { text: "user.user", value: 2, selected: false }
      ]
    },
    languageOptions() {
      return [
        { text: "interface.english", value: "en", selected: false },
        { text: "interface.polish", value: "pl", selected: false }
      ]
    }
  }
}
</script>
