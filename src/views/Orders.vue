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
    <div class="table-container" v-for="cafe in cafeItems" :key="cafe.cafeId">
      <div class="content-block">
        <div class="cafe-actions">
          <div class="cafe-name-link">
            <a class="cafe-name" :href="cafe.link" target="_blank"> {{ cafe.cafeName }} <fa-icon icon="external-link" /> </a>
          </div>
          <div class="order-block">
            <div class="order-user" v-if="currentUserIsAdmin">
              <label>{{ $t("order.userPay") }}:</label>
              <select-input :options="users" :init-value="cafe.orderUser" />
              <form-button label="interface.select" @click="selectUser()"></form-button>
            </div>
            <div v-else>
              <label>{{ $t("order.userPay") }}: {{ cafe.orderUser }}</label>
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
            <div v-if="data.item.edit">
              <input v-model="data.item.order_name" class="cafe-input" />
            </div>
            <div v-else class="text">
              {{ data.item.order_name }}
            </div>
          </template>
          <template #cell(price)="data">
            <div v-if="data.item.edit">
              <input v-model="data.item.price" class="cafe-input number" type="number" />
            </div>
            <div v-else class="text">
              {{ data.item.price }}
            </div>
          </template>
          <template #cell(actions)="data">
            <div class="action-buttons" v-if="data.item.edit">
              <div class="apply" @click="onClickApply(data.item)">
                <fa-icon icon="check-square-o" />
              </div>
              <div class="decline" @click="onClickDecline(data.item)">
                <fa-icon icon="ban" />
              </div>
            </div>
            <div class="action-buttons" v-else>
              <div class="edit" @click="onClickEdit(data.item)">
                <fa-icon icon="pencil-square-o" />
              </div>
              <div class="delete" @click="onClickDelete(data.item)">
                <fa-icon icon="trash-o" />
              </div>
            </div>
          </template>
        </b-table>
      </div>
    </div>
    <modal-question ref="orderApprovedModal " modalId="orderApprovedModal" title="correct?" content="vse zbs?" :apply="apply" />
  </div>
</template>

<script>
import ApiErrorHelper from "@/services/apiErrorHelper"
import FormButton from "@/components/controls/FormButton"
import SelectInput from "@/components/controls/SelectInput"
import FaIcon from "@/components/icons/FaIcon"
import ModalQuestion from "@/components/modalQuestion"
//import { ApiEndpoints } from "@/enums/apiEndpoints"

export default {
  name: "Orders",
  components: { ModalQuestion, FaIcon, SelectInput, FormButton },

  mixins: [ApiErrorHelper],
  data() {
    return {
      date: this.today(),
      cafeItems: [
        {
          cafeName: "Pasibus",
          cafeId: "1",
          link: "https://www.pasidostawa.pl/pasibus-pasaz-grunwaldzki",
          orderUser: undefined,
          closed: false,
          orders: [
            {
              order_id: 1,
              user: "Иван",
              order_name: "печеньки",
              price: 3.14,
              shipping: 0.16,
              packing: 1,
              edit: false
            },
            {
              order_id: 2,
              user: "Игорь",
              order_name: "хлебные корочки",
              price: 3.16,
              shipping: 0.14,
              packing: 1,
              edit: false
            },
            {
              order_id: 3,
              user: "Саня",
              order_name: "Чего нибудь набрать до сотки",
              price: 3.16,
              shipping: 0.14,
              packing: 1,
              edit: false
            }
          ]
        },
        {
          cafeName: "Słowianka",
          cafeId: "2",
          link: "https://www.pyszne.pl/menu/slowianka-jednosci-narodowej",
          orderUser: undefined,
          closed: false,
          orders: [
            {
              order_id: 4,
              user: "Иван",
              order_name: "чаю",
              price: 3.14,
              shipping: 0.16,
              packing: 1,
              edit: false
            },
            {
              order_id: 5,
              user: "Игорь",
              order_name: "оладушки",
              price: 4.16,
              shipping: 0.14,
              packing: 1,
              edit: false
            },
            {
              order_id: 6,
              user: "Саня",
              order_name: "Чего нибудь еще бы",
              price: 5.16,
              shipping: 0.14,
              packing: 1,
              edit: false
            }
          ]
        }
      ],
      users: [
        { text: "Ihor Kyryliuk", value: 7, selected: false },
        { text: "ivan Barbashov", value: 154, selected: false },
        { text: "WqZOPFp0Hk eAf5AQd4yp", value: 153, selected: false }
      ]
    }
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
    },
    today() {
      let date = new Date()
      return this.dateToString(date)
    },
    dateToString(date) {
      let month = "" + (date.getMonth() + 1)
      let day = "" + date.getDate()
      let year = date.getFullYear()

      return year + "-" + month + "-" + day
    },
    onClickEdit(row) {
      row.edit = true
      row.old_order_name = row.order_name
      row.old_price = row.price
    },
    onClickApply(row) {
      // let updatedOrder = {
      //   order_id: row.order_id,
      //   order_name: row.order_name,
      //   price: row.price
      // }
      //
      // this.$axios
      //   .patch(ApiEndpoints.ORDER_CHANGE, updatedOrder)
      //   .then(() => {
      //     this.$store.commit("toasts/addSuccessToast", "order.updated")
      //     row.edit = false
      //   })
      //   .catch((error) => {
      //     this.catchAxiosError(error)
      //   })
      row.edit = false
    },
    onClickDecline(row) {
      row.edit = false
      row.order_name = row.old_order_name
      row.price = row.old_price
    },
    onClickDelete(row) {
      console.log("delete order " + row.order_id)
    },
    selectUser() {},
    closeOrder(cafe) {
      cafe.closed = true
    },
    openOrder(cafe) {
      cafe.closed = false
    },
    ordered() {
      console.log(this.$refs.orderApprovedModal)
      //this.$refs.orderApprovedModal.show()
    },
    apply() {
      console.log("apply")
    }
  },
  computed: {
    currentUserIsAdmin() {
      return this.$authService.getUserData().roleId < 2
    },
    getColumns() {
      return [
        { key: "user", label: this.$t("table.orderColumns.user"), sortable: true },
        { key: "order_name", label: this.$t("table.orderColumns.order"), sortable: false },
        { key: "price", label: this.$t("table.orderColumns.price"), class: "align-right column-width", sortable: true },
        { key: "shipping", label: this.$t("table.orderColumns.shipping"), class: "align-right column-width", sortable: true },
        { key: "packing", label: this.$t("table.orderColumns.packing"), class: "align-right column-width", sortable: true },
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

    .cafe-input {
      width: 100%;
      outline: none;
      border: none;
      border-bottom: 1px solid $primary;

      &.number {
        text-align: right;
      }
    }

    .text {
      padding: 1px 0 2px 0;
    }
  }

  .action-buttons {
    display: flex;
    justify-content: center;

    i {
      padding: 2px 8px;
      cursor: pointer;
    }

    .delete:hover,
    .decline:hover {
      color: $danger;
    }

    .edit:hover,
    .apply:hover {
      color: $success;
    }
  }
}
</style>
