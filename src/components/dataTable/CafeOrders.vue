<template>
  <div class="table-container cafe-orders">
    <div class="content-block">
      <div class="cafe-actions">
        <div class="cafe-name-link">
          <a :href="cafeData.link" class="cafe-name" target="_blank">
            {{ cafeData.name }}
            <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
          </a>
        </div>
        <div class="order-block">
          <div class="order-user">
            <label>{{ $t("order.userPay") }}:</label>
            <template v-if="$authService.isAdministrator() && !cafeData.closed">
              <select-input ref="selectedUserToPay" :init-value="cafeData.order_person" :options="usersList" @change="checkSelectedUser($event)" />
              <form-button :disabled="disableSelectUser" label="interface.select" @click="selectUser()"></form-button>
            </template>
            <span v-else class="user-name-to-pay">{{ getSelectedUserToPay }}</span>
          </div>
          <div class="horizontal-separator"></div>
          <div v-if="cafeData.closed" class="close-order-button">
            <form-button label="interface.openOrder" @click="openOrder()"></form-button>
            <form-button v-if="!cafeData.ordered" label="interface.ordered" @click="ordered()"></form-button>
            <div v-else class="ordered-date">
              <div>{{ $t("order.orderedDate") }}</div>
              <div>{{ cafeData.ordered_date }}</div>
            </div>
          </div>
          <div v-else>
            <form-button label="interface.closeOrder" @click="closeOrder()"></form-button>
          </div>
        </div>
      </div>

      <b-table :fields="getColumns" :items="cafeData.orders" primary-key="id" responsive show-empty>
        <template #empty="">
          <span class="text-primary"> {{ $t("table.noItems") }} </span>
        </template>

        <template #cell(order_name)="data">
          <div v-if="orderInEditMode(data.item.id)">
            <input v-model="selectedOrdersData['cafe_' + data.item.id].order_name" class="cafe-input" />
          </div>
          <div v-else class="text">
            {{ data.item.order_name }}
          </div>
        </template>

        <template #cell(price)="data">
          <div v-if="orderInEditMode(data.item.id)">
            <input v-model="selectedOrdersData['cafe_' + data.item.id].price" class="cafe-input number" type="number" />
          </div>
          <div v-else class="text">
            {{ data.item.final_price }} {{ currency }}
            <div class="small-price">({{ data.item.price }} {{ currency }})</div>
          </div>
        </template>

        <template #cell(actions)="data">
          <div v-if="data.item.can_edit">
            <div v-if="orderInEditMode(data.item.id)" class="action-buttons">
              <div class="action apply" @click="updateOrder(data.item.id)">
                <font-awesome-icon icon="fa-solid fa-check" />
              </div>
              <div class="action decline" @click="cancelEdit(data.item.id)">
                <font-awesome-icon icon="fa-solid fa-ban" />
              </div>
            </div>
            <div v-else class="action-buttons">
              <div class="action edit" @click="editOrder(data.item)">
                <font-awesome-icon icon="fa-solid fa-pencil" />
              </div>
              <div class="action delete" @click="askToDeleteOrder(data.item.id)">
                <font-awesome-icon icon="fa-solid fa-trash-can" />
              </div>
            </div>
          </div>
        </template>

        <template v-slot:custom-foot="">
          <b-tr class="footer footer-row">
            <b-td></b-td>
            <b-td>
              {{ $t("order.total") }}: {{ cafeData.total_price }} {{ currency }}
              <span v-if="cafeData.total_discount > 0" class="small-price">
                {{ $t("order.discount") }}: {{ cafeData.total_discount }} <span v-if="cafeData.total_discount_in_percent">%</span>
                <span v-else>{{ currency }}</span>
              </span>
            </b-td>
            <b-td>
              <div class="text">{{ cafeData.total_orders_price }} {{ currency }}</div>
            </b-td>
            <b-td>
              <div v-if="footer.total_edit">
                <input v-model="footer.total_shipping_price" class="cafe-input number footer" type="number" />
              </div>
              <div v-else class="text">+{{ cafeData.total_shipping_price }} {{ currency }}</div>
            </b-td>
            <b-td>
              <div v-if="footer.total_edit">
                <input v-model="footer.total_packing_price" class="cafe-input number footer" type="number" />
              </div>
              <div v-else class="text">+{{ cafeData.total_packing_price }} {{ currency }}</div>
            </b-td>
            <b-td>
              <div v-if="cafeData.can_edit">
                <div class="action-buttons">
                  <template v-if="footer.total_edit">
                    <div class="action apply" @click="setOrderPrices()">
                      <font-awesome-icon icon="fa-solid fa-check" />
                    </div>
                    <div class="action decline" @click="cancelEditOrderPrices()">
                      <font-awesome-icon icon="fa-solid fa-ban" />
                    </div>
                  </template>
                  <template v-else>
                    <div class="action edit" @click="editOrderPrices()">
                      <font-awesome-icon icon="fa-solid fa-pencil" />
                    </div>
                    <div class="action" @click="openDiscountModal(cafeData.total_discount, cafeData.total_discount_in_percent)">
                      <font-awesome-icon icon="fa-solid fa-percent" />
                    </div>
                  </template>
                </div>
              </div>
              <div v-else></div>
            </b-td>
          </b-tr>
        </template>
      </b-table>
    </div>
    <order-discount-modal ref="discountModal" :apply="applyDiscount" />
  </div>
</template>

<script>
import FormButton from "@/components/controls/FormButton"
import SelectInput from "@/components/controls/SelectInput"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import ApiErrorHelper from "@/services/apiErrorHelper"
import SystemTypes from "@/enums/systemTypes"
import OrderDiscountModal from "@/views/modals/OrderDiscountModal"
import { mapState } from "vuex"

export default {
  name: "CafeOrders",
  components: { OrderDiscountModal, SelectInput, FormButton },
  mixins: [ApiErrorHelper],
  props: {
    cafeData: {
      type: Object
    }
  },
  data() {
    return {
      disableSelectUser: true,
      selectedOrders: [],
      selectedOrdersData: {},
      footer: {
        total_edit: false,
        total_shipping_price: 0,
        total_packing_price: 0
      }
    }
  },
  mounted() {
    let ord = this.cafeData.orders
    for (let i in ord) {
      this.selectedOrdersData["cafe_" + ord[i].id] = { ...ord[i] }
    }
  },
  methods: {
    checkSelectedUser(user) {
      if (user !== this.cafeData.order_person) this.disableSelectUser = false
    },
    selectUser() {
      let userId = this.$refs.selectedUserToPay.value
      let id = this.cafeData.id
      this.$axios
        .post(ApiEndpoints.SET_ORDER_USER_TO_PAY, { id, userId })
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "order.updated")
          this.disableSelectUser = true
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    closeOrder() {
      this.$axios
        .post(ApiEndpoints.CLOSE_ORDER, { id: this.cafeData.id })
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "order.updated")
          this.$emit("updateOrders")
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    openOrder() {
      this.$axios
        .post(ApiEndpoints.OPEN_ORDER, { id: this.cafeData.id })
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "order.updated")
          this.$emit("updateOrders")
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    ordered(cafe) {
      this.$store.commit("dialog/openDialog", {
        apply: () => this.apply(cafe),
        message: "order.orderedQuestion",
        title: "order.orderedTitleQuestion"
      })
    },
    apply() {
      this.$axios
        .post(ApiEndpoints.SET_ORDER_ORDERED, { id: this.cafeData.id })
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "order.updated")
          this.$emit("updateOrders")
          this.$store.commit("dialog/hideDialog")
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    orderInEditMode(id) {
      return this.selectedOrders.indexOf(id) > -1
    },
    editOrder(order) {
      this.selectedOrdersData[`cafe_${order.id}`].order_name = order.order_name
      this.selectedOrdersData[`cafe_${order.id}`].price = order.price
      this.selectedOrders.push(order.id)
    },
    updateOrder(id) {
      let editedData = this.selectedOrdersData["cafe_" + id]
      let updatedOrder = {
        order_id: id,
        order_name: editedData.order_name,
        price: editedData.price
      }
      this.$axios
        .patch(ApiEndpoints.ORDER_CHANGE, updatedOrder)
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "order.updated")
          this.$emit("updateOrders")
          this.cancelEdit(id)
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    cancelEdit(id) {
      let index = this.selectedOrders.indexOf(id)
      this.selectedOrders.splice(index, 1)
    },
    askToDeleteOrder(id) {
      this.$store.commit("dialog/openDialog", {
        apply: () => this.deleteOrder(id),
        message: "order.deleteOrderQuestion",
        type: SystemTypes.DANGER
      })
    },
    deleteOrder(id) {
      this.$axios
        .delete(ApiEndpoints.DELETE_ORDER + "/" + id)
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "order.deleted")
          this.$emit("updateOrders")
          this.$store.commit("dialog/hideDialog")
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    editOrderPrices() {
      this.footer.total_edit = true
      this.footer.total_shipping_price = this.cafeData.total_shipping_price
      this.footer.total_packing_price = this.cafeData.total_packing_price
    },
    setOrderPrices() {
      this.$axios
        .post(ApiEndpoints.UPDATE_ORDER_PRICES, {
          id: this.cafeData.id,
          shipping: this.footer.total_shipping_price,
          packing: this.footer.total_packing_price
        })
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "order.updated")
          this.$emit("updateOrders")
          this.footer.total_edit = false
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    cancelEditOrderPrices() {
      this.footer.total_edit = false
    },
    openDiscountModal(total_discount, total_discount_in_percent) {
      this.$refs.discountModal.show(total_discount, total_discount_in_percent)
    },
    applyDiscount(price, type) {
      this.$axios
        .post(ApiEndpoints.SET_ORDER_DISCOUNT, {
          id: this.cafeData.id,
          discount: price,
          percent: type
        })
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "order.updated")
          this.$emit("updateOrders")
          this.$refs.discountModal.hide()
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    }
  },
  computed: {
    ...mapState("basic", ["currency", "usersList"]),
    getSelectedUserToPay() {
      if (this.$store.state.basic.usersList.length < 1) {
        return ""
      }
      return this.$store.state.basic.usersList.find((u) => u.value === this.cafeData.order_person).text
    },
    getColumns() {
      return [
        { key: "user", label: this.$t("table.orderColumns.user"), class: "user-column" },
        { key: "order_name", label: this.$t("table.orderColumns.order") },
        { key: "price", label: this.$t("table.orderColumns.price"), class: "align-right column-width" },
        {
          key: "shipping_price",
          label: this.$t("table.orderColumns.shipping"),
          class: "align-right column-width"
        },
        {
          key: "packing_price",
          label: this.$t("table.orderColumns.packing"),
          class: "align-right column-width"
        },
        { key: "actions", label: "", class: "column-width" }
      ]
    }
  }
}
</script>

<style lang="scss">
@import "../../scss/components/color";

.cafe-orders {
  .cafe-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;

    .cafe-name-link {
      display: flex;
      align-items: center;
      width: 350px;

      .cafe-name {
        color: $primary;
        font-size: 1.3rem;
        line-height: 1.3rem;
        font-weight: 500;

        svg {
          font-size: 1rem;
          margin-bottom: 2px;
        }
      }
    }

    .order-block {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      .order-user {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        .user-name-to-pay {
          font-weight: bold;
        }

        .form-group {
          margin-bottom: 0;
        }

        .openable-options {
          top: 33px;
        }
      }

      .close-order-button {
        display: flex;
        gap: 1rem;
      }
    }
  }

  .table-responsive {
    margin-bottom: 0;
    border-bottom: 1px solid $input-border-color;

    .column-width {
      width: 9rem;
    }

    .user-column {
      width: 25%;
    }

    .cafe-input {
      width: 100%;
      outline: none;
      border: none;
      border-bottom: 1px solid $primary;

      &.number {
        text-align: right;

        &.footer {
          background: #f3f2f7;
        }
      }
    }

    .text {
      padding: 1px 0 2px 0;
    }
  }

  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 0.6rem;

    .action {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid $primary;
      border-radius: 4px;
      width: 2rem;
      height: 2rem;
      background-color: $primary;
      color: $white;
      cursor: pointer;

      svg {
        height: 0.85rem;
      }

      &.edit {
        background-color: $primary;
        border-color: $primary;
      }

      &.delete {
        background-color: $danger;
        border-color: $danger;
      }

      &.decline {
        background-color: $warning;
        border-color: $warning;
      }

      &.apply {
        background-color: $success;
        border-color: $success;
      }
    }
  }

  .footer {
    background: #f3f2f7;

    &.footer-row {
      text-align: right;
    }
  }
}

.small-price {
  font-size: 0.75rem;
}

.horizontal-separator {
  width: 1px;
  border-left: 1px solid $input-border-color;
  height: 20px;
}

.discount-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  .discount-input {
    width: 100%;
  }
}
</style>
