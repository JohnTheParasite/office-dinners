<template>
  <b-modal id="userDataModal" centered :header-class="getButtonVariant" no-close-on-backdrop>
    <template #modal-header="{ close }">
      <h5>{{ $t(title) }}</h5>
      <form-button @click="close" type="secondary" class="close">
        <fa-icon icon="close" />
      </form-button>
    </template>
    <text-input label="user.name" :init-value="formGroup.name" @input="onChange('name', $event)" :required="true" />
    <text-input label="user.surname" :init-value="formGroup.surname" @input="onChange('surname', $event)" :required="true" />
    <text-input label="email" type="email" :init-value="formGroup.mail" @input="onChange('mail', $event)" :required="true" />
    <password-input :init-value="formGroup.password" @input="onChange('password', $event)" :required="isAddUser" />
    <radio-list :options="roleOptions" label="user.role" :init-value="formGroup.role" @change="onChange('role', $event)" />
    <select-input
      :options="languageOptions"
      label="user.preferredLanguage"
      :init-value="formGroup.selected_language"
      @change="onChange('selected_language', $event)"
      :required="true"
    />
    <checkbox label="user.active" :init-value="formGroup.active" @change="onChange('role', $event)" />
    <template #modal-footer="{ cancel }">
      <form-button label="Cancel" @click="cancel" type="secondary" />
      <form-button v-if="isAddUser" label="interface.create" @click="create()" :type="getButtonVariant" :disabled="!verified" />
      <form-button v-if="!isAddUser" label="interface.update" @click="update()" :type="getButtonVariant" :disabled="!verified" />
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
import PasswordInput from "@/components/controls/PasswordInput"

export default {
  name: "UserFormModal",
  components: { PasswordInput, SelectInput, Checkbox, RadioList, FaIcon, FormButton, TextInput },
  mixins: [ApiErrorHelper],
  props: {
    variation: {
      default: SystemTypes.PRIMARY
    }
  },
  data() {
    return {
      formGroup: {
        mail: "",
        password: "",
        name: "",
        surname: "",
        active: true,
        selected_language: "pl",
        role: 2
      },
      userId: undefined
    }
  },
  methods: {
    show(userId) {
      this.userId = userId
      this.initFormGroup()
      if (this.isAddUser) {
        this.$bvModal.show("userDataModal")
      } else {
        this.getUserData(userId)
      }
    },
    onChange(field, value) {
      this.formGroup[field] = value
    },
    initFormGroup() {
      this.formGroup = {
        mail: "",
        password: "",
        name: "",
        surname: "",
        active: true,
        selected_language: "pl",
        role: 2
      }
    },
    create() {
      this.$axios
        .post(ApiEndpoints.CREATE_USER, FormDataService.getFormData(this.formGroup))
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "user.created")
          this.$emit("refreshTable")
          this.$bvModal.hide("userDataModal")
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    update() {
      this.$axios
        .patch(ApiEndpoints.USER_DATA + "/" + this.userId, this.formGroup)
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "user.modified")
          this.$emit("refreshTable")
          this.$bvModal.hide("userDataModal")
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    getUserData(userId) {
      this.$axios
        .get(ApiEndpoints.USER_DATA + "/" + userId)
        .then((response) => {
          if (response && response.data) {
            Object.assign(this.formGroup, response.data)
            this.$bvModal.show("userDataModal")
          }
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    }
  },
  computed: {
    roleOptions() {
      return [
        { text: "user.admin", value: 1, selected: false },
        { text: "user.user", value: 2, selected: false }
      ]
    },
    languageOptions() {
      return [
        { text: "interface.english", value: "en", selected: false },
        { text: "interface.polish", value: "pl", selected: false }
      ]
    },
    getButtonVariant() {
      return this.isAddUser ? SystemTypes.PRIMARY : SystemTypes.WARNING
    },
    title() {
      return this.$t(this.isAddUser ? "user.create" : "user.edit")
    },
    verified() {
      return (
        this.formGroup.mail.length &&
        (this.isAddUser ? this.formGroup.password.length : true) &&
        this.formGroup.name.length &&
        this.formGroup.surname.length &&
        this.formGroup.selected_language.length
      )
    },
    isAddUser() {
      return this.userId === undefined
    }
  }
}
</script>
