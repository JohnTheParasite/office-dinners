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
              <select-input
                ref="selectedUserToPay"
                :init-value="cafeData.order_person"
                :options="$store.state.global.usersList"
                @change="checkSelectedUser($event)"
              />
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
          <div v-if="editOrder(data.item.id)">
            <input v-model="selectedOrdersData['cafe_' + data.item.id].order_name" class="cafe-input" />
          </div>
          <div v-else class="text">
            {{ data.item.order_name }}
          </div>
        </template>

        <template #cell(price)="data">
          <div v-if="editOrder(data.item.id)">
            <input v-model="selectedOrdersData['cafe_' + data.item.id].price" class="cafe-input number" type="number" />
          </div>
          <div v-else class="text">
            {{ data.item.price }}
          </div>
        </template>

        <template #cell(actions)="data">
          <div v-if="data.item.can_edit">
            <div v-if="editOrder(data.item.id)" class="action-buttons">
              <div class="action apply" @click="onClickApply(data.item)">
                <font-awesome-icon icon="fa-solid fa-check" />
              </div>
              <div class="action decline" @click="onClickDecline(data.item)">
                <font-awesome-icon icon="fa-solid fa-ban" />
              </div>
            </div>
            <div v-else class="action-buttons">
              <div class="action edit" @click="onClickEdit(data.item)">
                <font-awesome-icon icon="fa-solid fa-pencil" />
              </div>
              <div class="action delete" @click="onClickDelete(data.item)">
                <font-awesome-icon icon="fa-solid fa-trash-can" />
              </div>
            </div>
          </div>
        </template>

        <template v-slot:custom-foot="">
          <b-tr class="footer footer-row">
            <b-td></b-td>
            <b-td>Total:</b-td>
            <b-td>
              <div class="text">
                {{ cafeData.total_price }}
              </div>
            </b-td>
            <b-td>
              <div v-if="footer.total_edit">
                <input v-model="footer.total_shipping_price" class="cafe-input number footer" type="number" />
              </div>
              <div v-else class="text">
                {{ footer.total_shipping_price }}
              </div>
            </b-td>
            <b-td>
              <div v-if="footer.total_edit">
                <input v-model="footer.total_packing_price" class="cafe-input number footer" type="number" />
              </div>
              <div v-else class="text">
                {{ footer.total_packing_price }}
              </div>
            </b-td>
            <b-td>
              <div v-if="cafeData.can_edit">
                <div v-if="footer.total_edit" class="action-buttons">
                  <div class="action apply" @click="onClickApplyFooter()">
                    <font-awesome-icon icon="fa-solid fa-check" />
                  </div>
                  <div class="action decline" @click="onClickDeclineFooter()">
                    <font-awesome-icon icon="fa-solid fa-ban" />
                  </div>
                </div>
                <div v-else class="action-buttons">
                  <div class="action edit" @click="onClickEditFooter()">
                    <font-awesome-icon icon="fa-solid fa-pencil" />
                  </div>
                  <div class="action" @click="onClickDiscount()">
                    <font-awesome-icon icon="fa-solid fa-percent" />
                  </div>
                </div>
              </div>
              <div v-else></div>
            </b-td>
          </b-tr>
        </template>
      </b-table>
    </div>
    <simple-dialog
      ref="orderApprovedModal"
      :apply="apply"
      content="order.orderedQuestion"
      modalId="orderApprovedModal"
      title="order.orderedTitleQuestion"
    ></simple-dialog>
    <simple-dialog ref="discountModal" :apply="applyDiscount" modalId="discountModal" title="interface.selectDiscount">
      <div class="discount-area">
        <div class="discount-input">
          <text-input type="number" @input="onChange('discount', $event)"></text-input>
        </div>
        <toggle :init-value="percent" label="interface.percent" @change="onChange('percent', $event)"></toggle>
      </div>
    </simple-dialog>
  </div>
</template>

<script>
import FormButton from "@/components/controls/FormButton"
import SelectInput from "@/components/controls/SelectInput"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import Toggle from "@/components/controls/Toggle"
import TextInput from "@/components/controls/TextInput"
import ApiErrorHelper from "@/services/apiErrorHelper"
import SimpleDialog from "@/components/modals/SimpleDialog"

export default {
  name: "CafeOrders",
  components: { SimpleDialog, TextInput, Toggle, SelectInput, FormButton },
  mixins: [ApiErrorHelper],
  props: {
    cafeData: {
      type: Object
    }
  },
  data() {
    return {
      disableSelectUser: true,
      order_person: undefined,
      selectedOrders: [],
      selectedOrdersData: {},
      discount: 0,
      percent: false,
      footer: {
        total_edit: false,
        total_shipping_price: 0,
        old_total_shipping_price: 0,
        total_packing_price: 0,
        old_total_packing_price: 0
      }
    }
  },
  mounted() {
    this.order_person = this.cafeData.order_person
    this.footer.total_shipping_price = this.cafeData.total_shipping_price
    this.footer.total_packing_price = this.cafeData.total_packing_price
    let ord = this.cafeData.orders
    for (let i in ord) {
      this.selectedOrdersData["cafe_" + ord[i].id] = ord[i]
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
      this.$refs.orderApprovedModal.show(() => this.apply(cafe))
    },
    apply() {
      this.$axios
        .post(ApiEndpoints.SET_ORDER_ORDERED, { id: this.cafeData.id })
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "order.updated")
          this.$emit("updateOrders")
          this.$refs.orderApprovedModal.hide()
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    onChange(field, value) {
      this[field] = value
    },
    editOrder(id) {
      let element = this.selectedOrders.find((item) => item.id === id)
      return element !== undefined
    },
    onClickEdit(row) {
      this.selectedOrders.push({
        id: row.id,
        old_order_name: row.order_name,
        old_price: row.price
      })
    },
    onClickApply(row) {
      let element = this.selectedOrders.find((item) => item.id === row.id)
      if (element === undefined) {
        return
      }
      let index = this.selectedOrders.indexOf(element)
      if (row.order_name === element.old_order_name && row.price === element.old_price) {
        this.selectedOrders.splice(index, 1)
        return
      }

      let editedData = this.selectedOrdersData["cafe_" + row.id]
      let updatedOrder = {
        order_id: row.id,
        order_name: editedData.order_name,
        price: editedData.price
      }
      this.$axios
        .patch(ApiEndpoints.ORDER_CHANGE, updatedOrder)
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "order.updated")
          this.$emit("updateOrders")
          this.selectedOrders.splice(index, 1)
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    onClickDecline(row) {
      let element = this.selectedOrders.find((item) => item.id === row.id)
      if (element === undefined) {
        return
      }

      row.order_name = element.old_order_name
      row.price = element.old_price

      let index = this.selectedOrders.indexOf(element)
      this.selectedOrders.splice(index, 1)
    },
    onClickDelete(row) {
      console.log("delete order " + row.id)
    },
    onClickEditFooter() {
      this.footer.total_edit = true
      this.footer.old_total_shipping_price = this.footer.total_shipping_price
      this.footer.old_total_packing_price = this.footer.total_packing_price
    },
    onClickApplyFooter() {
      this.footer.total_edit = false
    },
    onClickDeclineFooter() {
      this.footer.total_edit = false
      this.footer.total_shipping_price = this.footer.old_total_shipping_price
      this.footer.total_packing_price = this.footer.old_total_packing_price
    },
    onClickDiscount(cafe) {
      this.discount = 0
      this.percent = false
      this.$refs.discountModal.show(() => this.applyDiscount(cafe))
    },
    applyDiscount() {
      this.$refs.discountModal.hide()
    }
  },
  computed: {
    getSelectedUserToPay() {
      if (this.$store.state.global.usersList.length < 1) {
        return ""
      }
      return this.$store.state.global.usersList.find((u) => u.value === this.cafeData.order_person).text
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
