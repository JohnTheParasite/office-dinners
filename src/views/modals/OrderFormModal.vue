<template>
  <b-modal id="orderDataModal" centered header-class="primary" no-close-on-backdrop size="lg">
    <template #modal-header="{ close }">
      <h5>{{ formGroup.name }}</h5>
      <form-button @click="close" type="secondary" class="close">
        <fa-icon icon="close" />
      </form-button>
    </template>
    <div class="cafe-link-rating">
      <a :href="formGroup.link" target="_blank">{{ $t("order.clicklink") }}</a>
      <b-form-rating v-model="formGroup.rating_food" readonly></b-form-rating>
    </div>
    <div class="date-delivery-rating">
      <div class="date">
        <div class="last-order-label">{{ $t("table.columns.last_order_date") }}:</div>
        <div class="last-order-date">{{ formGroup.last_order_date }}</div>
      </div>
      <b-form-rating v-model="formGroup.rating_delivery" readonly></b-form-rating>
    </div>
    <div class="inputs">
      <text-input class="order" label="order.order" :init-value="formGroup.order_name" @input="onChange('order_name', $event)" :required="true" />
      <text-input label="order.price" :init-value="formGroup.price" @input="onChange('price', $event)" type="Number" :required="true" />
    </div>
    <select-input v-if="currentUserIsAdmin" :options="users" :init-value="formGroup.user_id" label="order.user" @change="onChange('user_id', $event)" />
    <template #modal-footer="{ cancel }">
      <form-button label="interface.cancel" @click="cancel" type="secondary" />
      <form-button label="interface.add" @click="add()" :disabled="!verified" />
    </template>
  </b-modal>
</template>

<script>
import TextInput from "@/components/controls/TextInput"
import FormButton from "@/components/controls/FormButton"
import FaIcon from "@/components/icons/FaIcon"
import ApiErrorHelper from "@/services/apiErrorHelper"
import SelectInput from "@/components/controls/SelectInput"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import FormDataService from "@/services/formDataService"

export default {
  name: "OrderFormModal",
  components: { SelectInput, FaIcon, FormButton, TextInput },
  mixins: [ApiErrorHelper],
  data() {
    return {
      formGroup: this.initFormGroup(),
      users: []
    }
  },
  methods: {
    show(cafe) {
      this.formGroup = this.initFormGroup()
      Object.assign(this.formGroup, cafe)
      this.getItems()
      this.$bvModal.show("orderDataModal")
    },
    initFormGroup() {
      return {
        id: undefined,
        name: "",
        link: "",
        rating_food: 0,
        rating_delivery: 0,
        last_order_date: "",
        price: "",
        order_name: "",
        user_id: this.$authService.getUserData().id
      }
    },
    onChange(field, value) {
      this.formGroup[field] = value
    },
    getItems() {
      this.users = [
        { text: "Ihor Kyryliuk", value: 7, selected: false },
        { text: "ivan Barbashov", value: 154, selected: false },
        { text: "WqZOPFp0Hk eAf5AQd4yp", value: 153, selected: false }
      ]
    },
    add() {
      this.$axios
        .post(
          ApiEndpoints.ORDER_ADD,
          FormDataService.getFormData({
            cafe_id: this.formGroup.id,
            order_name: this.formGroup.order_name,
            price: this.formGroup.price,
            user_id: this.formGroup.user_id
          })
        )
        .then((response) => {
          if (response && response.data) {
            this.$store.commit("toasts/addSuccessToast", "order.added")
            this.$bvModal.hide("orderDataModal")
          }
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    }
  },
  computed: {
    verified() {
      return this.formGroup.order_name.length > 0 && this.formGroup.price > 0
    },
    currentUserIsAdmin() {
      return this.$authService.getUserData().roleId < 2
    }
  }
}
</script>

<style lang="scss" scoped>
.cafe-link-rating,
.date-delivery-rating {
  display: flex;
  justify-content: space-between;

  .cafe-name {
    font-size: 1rem;
    font-weight: 600;
  }
}

.date {
  display: flex;
  font-size: 1rem;
  margin-bottom: 1rem;

  .last-order-label {
    margin-right: 8px;
  }

  .last-order-date {
    font-weight: 600;
  }
}

.inputs {
  display: grid;
  grid-template-columns: 1fr 150px;
  gap: 1rem;
}
</style>
