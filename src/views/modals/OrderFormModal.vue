<template>
  <b-modal id="orderDataModal" centered header-class="primary" no-close-on-backdrop size="lg">
    <template #modal-header="{ close }">
      <h5>{{ formGroup.name }}</h5>
      <form-button class="close" type="secondary" @click="close">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </form-button>
    </template>
    <div class="cafe-link-rating">
      <a :href="formGroup.link" target="_blank"
        >{{ $t("order.clicklink") }}
        <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
      </a>
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
      <text-input :init-value="formGroup.order_name" :required="true" class="order" label="order.order" @input="onChange('order_name', $event)" />
      <text-input :init-value="formGroup.price" :required="true" label="order.price" type="Number" @input="onChange('price', $event)" />
    </div>
    <select-input
      v-if="$authService.isAdministrator()"
      :init-value="formGroup.user_id"
      :options="$store.state.basic.usersList"
      label="order.user"
      @change="onChange('user_id', $event)"
    />
    <template #modal-footer="{ cancel }">
      <form-button label="interface.cancel" type="secondary" @click="cancel" />
      <form-button :disabled="!verified" label="interface.add" @click="add()" />
    </template>
  </b-modal>
</template>

<script>
import TextInput from "@/components/controls/TextInput"
import FormButton from "@/components/controls/FormButton"
import ApiErrorHelper from "@/services/apiErrorHelper"
import SelectInput from "@/components/controls/SelectInput"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import FormDataService from "@/services/formDataService"
import { orderBus } from "@/eventBuses/eventBuses"

export default {
  name: "OrderFormModal",
  components: { SelectInput, FormButton, TextInput },
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
            orderBus.$emit("updateOrders")
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
