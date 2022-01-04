<template>
  <b-modal id="AddUserModal" centered :header-class="getButtonVariant" no-close-on-backdrop>
    <template #modal-header="{ close }">
      <h5>{{ $t(title) }}</h5>
      <form-button @click="close" type="secondary" class="close">
        <fa-icon icon="close" />
      </form-button>
    </template>
    <text-input label="user.name" :init-value="formGroup.name" @input="onChange('name', $event)" :required="true" warningMessage="errors.fieldIsRequired" />
    <text-input
      label="user.surname"
      :init-value="formGroup.surname"
      @input="onChange('surname', $event)"
      :required="true"
      warningMessage="errors.fieldIsRequired"
    />
    <text-input
      label="email"
      type="email"
      :init-value="formGroup.mail"
      @input="onChange('mail', $event)"
      :required="true"
      warningMessage="errors.fieldIsRequired"
    />
    <text-input
      label="password"
      :icon="passwordInput.icon"
      :on-icon-click="toggleElementType"
      :type="passwordInput.type"
      :init-value="formGroup.password"
      @input="onChange('password', $event)"
      :required="userId === undefined"
      warningMessage="errors.fieldIsRequired"
    />
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
      <form-button v-if="userId === undefined" label="interface.create" @click="create()" :type="getButtonVariant" :disabled="!verified" />
      <form-button v-if="userId !== undefined" label="interface.update" @click="update()" :type="getButtonVariant" :disabled="!verified" />
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
import InputTypes from "@/enums/inputTypes"
import IconNames from "@/enums/iconNames"

export default {
  name: "UserFormModal",
  components: { SelectInput, Checkbox, RadioList, FaIcon, FormButton, TextInput },
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
      userId: undefined,
      passwordInput: {
        type: InputTypes.PASSWORD,
        icon: IconNames.EYE
      }
    }
  },
  methods: {
    show(userId) {
      this.userId = userId
      this.passwordInput.icon = IconNames.EYE
      this.passwordInput.type = InputTypes.PASSWORD
      if (userId !== undefined) {
        this.getUserData(userId)
      } else {
        this.$bvModal.show("AddUserModal")
      }
    },
    onChange(field, value) {
      this.formGroup[field] = value
    },
    create() {
      this.$axios
        .post(ApiEndpoints.CREATE_USER, FormDataService.getFormData(this.formGroup))
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "user.created")
          this.$emit("refreshTable")
          this.$bvModal.hide("AddUserModal")
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
          this.$bvModal.hide("AddUserModal")
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
            this.formGroup = response.data
            this.$bvModal.show("AddUserModal")
          }
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    toggleElementType() {
      this.passwordInput.icon = this.passwordInput.type === InputTypes.PASSWORD ? IconNames.EYE_SLASH : IconNames.EYE
      this.passwordInput.type = this.passwordInput.type === InputTypes.PASSWORD ? InputTypes.TEXT : InputTypes.PASSWORD
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
      return this.userId === undefined ? SystemTypes.PRIMARY : SystemTypes.WARNING
    },
    title() {
      return this.$t(this.userId === undefined ? "user.create" : "user.edit")
    },
    verified() {
      return (
        this.formGroup.mail.length &&
        (this.userId === undefined ? this.formGroup.password.length : true) &&
        this.formGroup.name.length &&
        this.formGroup.surname.length &&
        this.formGroup.selected_language.length
      )
    }
  }
}
</script>
