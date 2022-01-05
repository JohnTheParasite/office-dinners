<template>
  <b-modal id="CafeDataModal" centered :header-class="getButtonVariant" no-close-on-backdrop>
    <template #modal-header="{ close }">
      <h5>{{ $t(title) }}</h5>
      <form-button @click="close" type="secondary" class="close">
        <fa-icon icon="close" />
      </form-button>
    </template>
    <text-input label="cafe.name" :init-value="formGroup.name" @input="onChange('name', $event)" :required="true" />
    <text-input label="cafe.link" :init-value="formGroup.link" @input="onChange('link', $event)" :required="true" />
    <template #modal-footer="{ cancel }">
      <form-button label="Cancel" @click="cancel" type="secondary" />
      <form-button v-if="isAddCafe" label="interface.create" @click="create()" :type="getButtonVariant" :disabled="!verified" />
      <form-button v-if="!isAddCafe" label="interface.update" @click="update()" :type="getButtonVariant" :disabled="!verified" />
    </template>
  </b-modal>
</template>

<script>
import TextInput from "@/components/controls/TextInput"
import FormButton from "@/components/controls/FormButton"
import SystemTypes from "@/enums/systemTypes"
import FaIcon from "@/components/icons/FaIcon"
import ApiErrorHelper from "@/services/apiErrorHelper"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import FormDataService from "@/services/formDataService"

export default {
  name: "CafeFormModal",
  components: { FaIcon, FormButton, TextInput },
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
      cafeId: undefined
    }
  },
  methods: {
    show(cafeId) {
      this.cafeId = cafeId
      if (this.isAddCafe) {
        this.$bvModal.show("CafeDataModal")
      } else {
        this.getCafeData(cafeId)
      }
    },
    onChange(field, value) {
      this.formGroup[field] = value
    },
    create() {
      this.$axios
        .post(ApiEndpoints.CREATE_CAFE, FormDataService.getFormData(this.formGroup))
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "cafe.created")
          this.$emit("refreshTable")
          this.$bvModal.hide("CafeDataModal")
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    update() {
      this.$axios
        .patch(ApiEndpoints.CAFE_DATA + "/" + this.cafeId, this.formGroup)
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "cafe.modified")
          this.$emit("refreshTable")
          this.$bvModal.hide("CafeDataModal")
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    getCafeData(cafeId) {
      this.$axios
        .get(ApiEndpoints.CAFE_DATA + "/" + cafeId)
        .then((response) => {
          if (response && response.data) {
            Object.assign(this.formGroup, response.data)
            this.$bvModal.show("CafeDataModal")
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
      return this.formGroup.name.length && this.formGroup.link.length
    },
    isAddCafe() {
      return this.cafeId === undefined
    }
  }
}
</script>
