<template>
  <div class="router-container cafe-orders-page">
    <div class="content-block date-block">
      <label class="dateLabel">{{ $t("order.orderDate") }}:</label>
      <div class="date-picker">
        <div class="button" @click="changeDate(-1)">&lt;</div>
        <div class="datepicker-element">
          <b-form-datepicker
            id="example-datepicker"
            v-model="date"
            @input="dateInput(date)"
            class="mb-2"
            start-weekday="1"
            right
            :placeholder="$t('interface.noDate')"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
          ></b-form-datepicker>
        </div>
        <div class="button" @click="changeDate(1)">&gt;</div>
      </div>
    </div>
    <div v-if="loadInProgress">
      <div class="content-block">
        <div class="loader">
          <CssLoader></CssLoader>
        </div>
      </div>
    </div>
    <div v-else class="table-container" v-for="(cafe, index) in cafeItems" :key="index">
      <div class="content-block">
        <div class="cafe-actions">
          <div class="cafe-name-link">
            <a class="cafe-name" :href="cafe.link" target="_blank">
              {{ cafe.name }}
              <fa-icon icon="external-link" />
            </a>
          </div>
          <div class="order-block">
            <div class="order-user" v-if="currentUserIsAdmin">
              <label>{{ $t("order.userPay") }}:</label>
              <select-input :options="$store.state.global.usersList" :init-value="cafe.order_person" />
              <form-button label="interface.select" @click="selectUser()"></form-button>
            </div>
            <div v-else>
              <label>{{ $t("order.userPay") }}: {{ cafe.order_person }}</label>
            </div>
            <div class="close-order-button" v-if="cafe.closed">
              <form-button label="interface.openOrder" @click="openOrder(cafe)"></form-button>
              <form-button label="interface.ordered" @click="ordered(cafe)"></form-button>
            </div>
            <div v-else>
              <form-button label="interface.closeOrder" @click="closeOrder(cafe)"></form-button>
            </div>
          </div>
        </div>

        <b-table :items="cafe.orders" :fields="getColumns" primary-key="id" responsive show-empty>
          <template #empty="">
            <span class="text-primary"> {{ $t("table.noItems") }} </span>
          </template>

          <template #cell(order_name)="data">
            <div v-if="editOrder(data.item.id)">
              <input v-model="data.item.order_name" class="cafe-input" />
            </div>
            <div v-else class="text">
              {{ data.item.order_name }}
            </div>
          </template>

          <template #cell(price)="data">
            <div v-if="editOrder(data.item.id)">
              <input v-model="data.item.price" class="cafe-input number" type="number" />
            </div>
            <div v-else class="text">
              {{ data.item.price }}
            </div>
          </template>

          <template #cell(actions)="data">
            <div v-if="data.item.can_edit">
              <div class="action-buttons" v-if="editOrder(data.item.id)">
                <div class="action apply" @click="onClickApply(data.item)">
                  <fa-icon icon="check-square-o" />
                </div>
                <div class="action decline" @click="onClickDecline(data.item)">
                  <fa-icon icon="ban" />
                </div>
              </div>
              <div class="action-buttons" v-else>
                <div class="action edit" @click="onClickEdit(data.item)">
                  <fa-icon icon="pencil-square-o" />
                </div>
                <div class="action delete" @click="onClickDelete(data.item)">
                  <fa-icon icon="trash-o" />
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
                  {{ cafe.total_price }}
                </div>
              </b-td>
              <b-td>
                <div v-if="cafe.total_edit">
                  <input v-model="cafe.total_shipping_price" class="cafe-input number footer" type="number" />
                </div>
                <div v-else class="text">
                  {{ cafe.total_shipping_price }}
                </div>
              </b-td>
              <b-td>
                <div v-if="cafe.total_edit">
                  <input v-model="cafe.total_packing_price" class="cafe-input number footer" type="number" />
                </div>
                <div v-else class="text">
                  {{ cafe.total_packing_price }}
                </div>
              </b-td>
              <b-td>
                <div v-if="cafe.can_edit">
                  <div class="action-buttons" v-if="cafe.total_edit">
                    <div class="action apply" @click="onClickApplyFooter(cafe)">
                      <fa-icon icon="check-square-o" />
                    </div>
                    <div class="action decline" @click="onClickDeclineFooter(cafe)">
                      <fa-icon icon="ban" />
                    </div>
                  </div>
                  <div class="action-buttons" v-else>
                    <div class="action edit" @click="onClickEditFooter(cafe)">
                      <fa-icon icon="pencil-square-o" />
                    </div>
                    <div class="action" @click="onClickDiscount(cafe)">
                      <fa-icon icon="percent" />
                    </div>
                  </div>
                </div>
                <div v-else></div>
              </b-td>
            </b-tr>
          </template>
        </b-table>
      </div>
    </div>
    <modal-question
      ref="orderApprovedModal"
      modalId="orderApprovedModal"
      title="interface.orderedTitleQuestion"
      content="interface.orderedQuestion"
      :apply="apply"
    ></modal-question>
    <modal-question ref="discountModal" modalId="discountModal" title="interface.selectDiscount" :apply="applyDiscount">
      <div class="discount-area">
        <div class="discount-input">
          <text-input type="number" @input="onChange('discount', $event)"></text-input>
        </div>
        <toggle label="interface.percent" :init-value="percent" @change="onChange('percent', $event)"></toggle>
      </div>
    </modal-question>
  </div>
</template>

<script>
import ApiErrorHelper from "@/services/apiErrorHelper"
import FormButton from "@/components/controls/FormButton"
import SelectInput from "@/components/controls/SelectInput"
import FaIcon from "@/components/icons/FaIcon"
import ModalQuestion from "@/components/modalQuestion"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import TextInput from "@/components/controls/TextInput"
import Toggle from "@/components/controls/Toggle"
import CssLoader from "@/components/CssLoader"

export default {
  name: "Orders",
  components: { CssLoader, Toggle, TextInput, ModalQuestion, FaIcon, SelectInput, FormButton },

  mixins: [ApiErrorHelper],
  data() {
    return {
      date: this.today(),
      percent: false,
      discount: 0,
      selectedOrders: [],
      cafeItems: [],
      loadInProgress: false
    }
  },
  beforeMount() {
    this.updateOrders()
  },
  methods: {
    changeDate(daysAmount) {
      if (!this.date.length) {
        return
      }

      let date = new Date(this.date)
      date.setDate(date.getDate() + daysAmount)

      this.dateToString(date)

      this.date = this.dateToString(date)

      this.updateOrders()
    },
    today() {
      let date = new Date()
      return this.dateToString(date)
    },
    dateToString(date) {
      let month = "" + (date.getMonth() + 1)
      month = month.length === 1 ? "0" + month : month

      let day = "" + date.getDate()
      day = day.length === 1 ? "0" + day : day

      let year = date.getFullYear()

      return year + "-" + month + "-" + day
    },
    onClickEdit(row) {
      this.selectedOrders.push({
        id: row.id,
        old_order_name: row.order_name,
        old_price: row.price
      })
    },
    onClickApply(row) {
      let updatedOrder = {
        order_id: row.order_id,
        order_name: row.order_name,
        price: row.price
      }
      this.$axios
        .patch(ApiEndpoints.ORDER_CHANGE, updatedOrder)
        .then(() => {
          this.$store.commit("toasts/addSuccessToast", "order.updated")
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
    onClickEditFooter(footer) {
      footer.total_edit = true
      footer.old_price = footer.price
      footer.old_shipping = footer.shipping
      footer.old_packing = footer.packing
    },
    onClickApplyFooter(footer) {
      footer.total_edit = false // + some api
    },
    onClickDeclineFooter(footer) {
      footer.total_edit = false
      footer.price = footer.old_price
      footer.shipping = footer.old_shipping
      footer.packing = footer.old_packing
    },
    onClickDiscount(cafe) {
      this.discount = 0
      this.percent = false
      this.$refs.discountModal.show(() => this.applyDiscount(cafe))
    },
    selectUser() {},
    closeOrder(cafe) {
      cafe.closed = true
    },
    openOrder(cafe) {
      cafe.closed = false
    },
    ordered(cafe) {
      this.$refs.orderApprovedModal.show(() => this.apply(cafe))
    },
    apply() {
      this.$refs.orderApprovedModal.hide()
    },
    applyDiscount() {
      this.$refs.discountModal.hide()
    },
    onChange(field, value) {
      this[field] = value
    },
    dateInput() {
      this.updateOrders()
    },
    updateOrders() {
      this.loadInProgress = true
      this.$axios
        .get(ApiEndpoints.ORDERS_GET + "?date=" + this.date)
        .then((response) => {
          if (response && response.data) {
            this.cafeItems = response.data
            this.loadInProgress = false
          }
        })
        .catch((error) => {
          this.catchAxiosError(error)
          this.loadInProgress = false
        })
    },
    editOrder(id) {
      let element = this.selectedOrders.find((item) => item.id === id)
      return element !== undefined
    }
  },
  computed: {
    currentUserIsAdmin() {
      return this.$authService.getUserData().roleId < 2
    },
    getColumns() {
      return [
        { key: "user", label: this.$t("table.orderColumns.user"), class: "user-column", sortable: true },
        { key: "order_name", label: this.$t("table.orderColumns.order"), sortable: false },
        { key: "price", label: this.$t("table.orderColumns.price"), class: "align-right column-width", sortable: true },
        {
          key: "shipping_price",
          label: this.$t("table.orderColumns.shipping"),
          class: "align-right column-width",
          sortable: true
        },
        {
          key: "packing_price",
          label: this.$t("table.orderColumns.packing"),
          class: "align-right column-width",
          sortable: true
        },
        { key: "actions", label: "", class: "column-width", sortable: false }
      ]
    }
  }
}
</script>

<style lang="scss">
@import "../scss/components/color";

.cafe-orders-page {
  .date-block {
    display: flex;
    align-items: center;

    .dateLabel {
      margin-left: 1.5rem;
    }

    .date-picker {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 1rem 0;

      .datepicker-element {
        width: 150px;
      }

      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid $primary;
        border-radius: 4px;
        margin: 4px 8px;
        width: 1.6rem;
        background-color: $primary;
        color: $white;
        cursor: pointer;
      }
    }
  }

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
        font-weight: 500;
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

    i {
      padding: 2px 8px;
      cursor: pointer;
    }

    .action {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid $primary;
      border-radius: 4px;
      width: 2rem;
      background-color: $primary;
      color: $white;
      cursor: pointer;
      padding-top: 3px;
      padding-bottom: 3px;

      &.edit {
        background-color: $primary;
        border-color: $primary;
        padding: 3px 0 3px 3px;
      }

      &.delete {
        background-color: $danger;
        border-color: $danger;
        padding: 0 1px;
      }

      &.decline {
        background-color: $warning;
        border-color: $warning;
      }

      &.apply {
        background-color: $success;
        border-color: $success;
        padding-left: 2px;
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

.discount-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  .discount-input {
    width: 100%;
  }
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;

  .lds-dual-ring {
    height: 5rem;
    width: 5rem;
  }

  .lds-dual-ring:after {
    border-color: $primary transparent $primary transparent;
    height: 5rem;
    width: 5rem;
  }
}
</style>
