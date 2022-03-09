<template>
  <b-modal id="cafeDataModal" centered :header-class="getButtonVariant" no-close-on-backdrop>
    <template #modal-header="{ close }">
      <h5>{{ $t(title) }}</h5>
      <form-button :disabled="loadInProgress" class="close" type="secondary" @click="close">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </form-button>
    </template>
    <text-input label="cafe.name" :init-value="formGroup.name" @input="onChange('name', $event)" :required="true" />
    <text-input label="cafe.link" :init-value="formGroup.link" @input="onChange('link', $event)" :required="true" />
    <template #modal-footer="{ cancel }">
      <form-button :disabled="loadInProgress" label="interface.cancel" type="secondary" @click="cancel" />
      <form-button v-if="isAddCafe" :disabled="!verified || loadInProgress" :type="getButtonVariant" label="interface.create" @click="create()" />
      <form-button v-if="!isAddCafe" :disabled="!verified || loadInProgress" :type="getButtonVariant" label="interface.update" @click="update()" />
    </template>
  </b-modal>
</template>

<script>
import TextInput from "@/components/controls/TextInput"
import FormButton from "@/components/controls/FormButton"
import SystemTypes from "@/enums/systemTypes"
import ApiErrorHelper from "@/services/apiErrorHelper"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import FormDataService from "@/services/formDataService"
import { httpRegex } from "@/helpers/validatorHelper"

export default {
  name: "CafeFormModal",
  components: { FormButton, TextInput },
  mixins: [ApiErrorHelper],
  props: {
    variation: {
      default: SystemTypes.PRIMARY
    }
  },
  data() {
    return {
      formGroup: {
        name: "",
        link: ""
      },
      cafeId: undefined,
      loadInProgress: false
    }
  },
  methods: {
    show(cafeId) {
      this.cafeId = cafeId
      this.initFormGroup()
      if (this.isAddCafe) {
        this.$bvModal.show("cafeDataModal")
      } else {
        this.getCafeData(cafeId)
      }
    },
    onChange(field, value) {
      this.formGroup[field] = value
    },
    initFormGroup() {
      this.formGroup = {
        name: "",
        link: ""
      }
    },
    create() {
      this.loadInProgress = true
      this.$axios
        .post(ApiEndpoints.CREATE_CAFE, FormDataService.getFormData(this.formGroup))
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "cafe.created")
          this.$emit("refreshTable")
          this.$bvModal.hide("cafeDataModal")
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
        .patch(ApiEndpoints.CAFE_DATA + "/" + this.cafeId, this.formGroup)
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "cafe.modified")
          this.$emit("refreshTable")
          this.$bvModal.hide("cafeDataModal")
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
        .finally(() => {
          this.loadInProgress = false
        })
    },
    getCafeData(cafeId) {
      this.$axios
        .get(ApiEndpoints.CAFE_DATA + "/" + cafeId)
        .then((response) => {
          if (response && response.data) {
            Object.assign(this.formGroup, response.data)
            this.$bvModal.show("cafeDataModal")
          }
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    }
  },
  computed: {
    getButtonVariant() {
      return this.isAddCafe ? SystemTypes.PRIMARY : SystemTypes.WARNING
    },
    title() {
      return this.$t(this.isAddCafe ? "cafe.create" : "cafe.edit")
    },
    verified() {
      let linkValidator = new RegExp(httpRegex)
      return this.formGroup.name.length && this.formGroup.link.length && linkValidator.test(this.formGroup.link)
    },
    isAddCafe() {
      return this.cafeId === undefined
    }
  }
}
</script>
