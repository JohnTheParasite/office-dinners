<template>
  <b-modal :id="'b' + _uid" :header-class="getButtonVariant" centered no-close-on-backdrop>
    <template #modal-header="{ close }">
      <h5>{{ $t(title) }}</h5>
      <form-button :disabled="loadInProgress" class="close" type="secondary" @click="close">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </form-button>
    </template>
    <text-input label="user.name" :init-value="formGroup.name" @input="onChange('name', $event)" :required="true" />
    <text-input label="user.surname" :init-value="formGroup.surname" @input="onChange('surname', $event)" :required="true" />
    <text-input label="email" type="email" :init-value="formGroup.mail" @input="onChange('mail', $event)" :required="true" />
    <password-input :init-value="formGroup.password" @input="onChange('password', $event)" :required="isAddUser" />
    <radio-list v-if="!isCurrentUser" :init-value="formGroup.role" :options="roleOptions" label="user.role" @change="onChange('role', $event)" />
    <select-input
      :options="languageOptions"
      label="user.preferredLanguage"
      :init-value="formGroup.selected_language"
      @change="onChange('selected_language', $event)"
      :required="true"
    />
    <checkbox v-if="!isCurrentUser" :init-value="formGroup.active" label="user.active" @change="onChange('active', $event)" />
    <template #modal-footer="{ cancel }">
      <form-button :disabled="loadInProgress" label="interface.cancel" type="secondary" @click="cancel" />
      <div class="acceptButton">
        <form-button v-if="isAddUser" :disabled="!verified || loadInProgress" :type="getButtonVariant" label="interface.create" @click="create()" />
        <form-button v-if="!isAddUser" :disabled="!verified || loadInProgress" :type="getButtonVariant" label="interface.update" @click="update()" />
      </div>
    </template>
  </b-modal>
</template>

<script>
import TextInput from "@/components/controls/TextInput"
import FormButton from "@/components/controls/FormButton"
import SystemTypes from "@/enums/systemTypes"
import RadioList from "@/components/controls/RadioList"
import Checkbox from "@/components/controls/Checkbox"
import SelectInput from "@/components/controls/SelectInput"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import FormDataService from "@/services/formDataService"
import ApiErrorHelper from "@/services/apiErrorHelper"
import PasswordInput from "@/components/controls/PasswordInput"
import AuthService from "@/services/authService"

export default {
  name: "UserFormModal",
  components: { PasswordInput, SelectInput, Checkbox, RadioList, FormButton, TextInput },
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
      loadInProgress: false
    }
  },
  methods: {
    show(userId) {
      this.userId = userId
      this.initFormGroup()
      if (this.isAddUser) {
        this.$bvModal.show("b" + this._uid)
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
      this.loadInProgress = true
      this.$axios
        .post(ApiEndpoints.CREATE_USER, FormDataService.getFormData(this.formGroup))
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "user.created")
          this.$emit("refreshTable")
          this.$bvModal.hide("b" + this._uid)
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
        .finally(() => {
          this.loadInProgress = false
        })
    },
    update() {
      this.loadInProgress = true
      this.$axios
        .patch(ApiEndpoints.USER_DATA + "/" + this.userId, this.formGroup)
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "user.modified")
          this.$emit("refreshTable")
          this.$bvModal.hide("b" + this._uid)
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
        .finally(() => {
          this.loadInProgress = false
          if (this.isCurrentUser) {
            AuthService.updateUserLanguage(this.formGroup.selected_language)
            window.location.reload()
          }
        })
    },
    getUserData(userId) {
      this.$axios
        .get(ApiEndpoints.USER_DATA + "/" + userId)
        .then((response) => {
          if (response && response.data) {
            Object.assign(this.formGroup, response.data)
            this.$bvModal.show("b" + this._uid)
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
        { text: "interface.polish", value: "pl", selected: false },
        { text: "interface.ukrainian", value: "ua", selected: false }
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
    },
    isCurrentUser() {
      return this.userId === this.$authService.getUserData().id
    }
  }
}
</script>

<style lang="scss"></style>
