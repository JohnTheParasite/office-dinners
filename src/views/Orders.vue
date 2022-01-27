<template>
  <div class="router-container cafe-orders-page">
    <div class="content-block date-block">
      <label class="dateLabel">{{ $t("order.orderDate") }}:</label>
      <div class="date-picker">
        <form-button label="<" class="button" type="secondary" @click="changeDate(-1)"></form-button>
        <b-form-datepicker
          id="example-datepicker"
          v-model="date"
          class="mb-2"
          start-weekday="1"
          right
          :placeholder="$t('interface.noDate')"
          :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
        ></b-form-datepicker>
        <form-button label=">" class="button" type="secondary" @click="changeDate(1)"></form-button>
      </div>
    </div>
    <div class="table-container" v-for="cafe in cafeItems" :key="cafe.cafeId">
      <div class="content-block">
        <div class="cafe-actions">
          <div class="cafe-name-link">
            <a class="cafe-name" :href="cafe.link" target="_blank"> {{ cafe.cafeName }} </a>
          </div>
          <div class="order-user" v-if="currentUserIsAdmin">
            <label>{{ $t("order.userPay") }}:</label>
            <select-input :options="users" :init-value="cafe.orderUser" />
          </div>
          <div class="order-button">
            <form-button label="interface.order" @click="makeOrder()"></form-button>
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
            <div v-else>
              {{ data.item.order_name }}
            </div>
          </template>
          <template #cell(actions)="data">
            <div class="action-buttons" v-if="data.item.edit">
              <div class="button" @click="onClickApply(data.item)">
                <fa-icon icon="check-square-o" />
              </div>
              <div class="button" @click="onClickDecline(data.item)">
                <fa-icon icon="ban" />
              </div>
            </div>
            <div class="action-buttons" v-else>
              <div class="button" @click="onClickEdit(data.item)">
                <fa-icon icon="pencil-square-o" />
              </div>
              <div class="button" @click="onClickDelete(data.item)">
                <fa-icon icon="times" />
              </div>
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import ApiErrorHelper from "@/services/apiErrorHelper"
import FormButton from "@/components/controls/FormButton"
import SelectInput from "@/components/controls/SelectInput"
import FaIcon from "@/components/icons/FaIcon"

export default {
  name: "Orders",
  components: { FaIcon, SelectInput, FormButton },

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
      row.edit = !row.edit
    },
    makeOrder() {}
  },
  computed: {
    currentUserIsAdmin() {
      return this.$authService.getUserData().roleId < 2
    },
    getColumns() {
      return [
        { key: "user", label: this.$t("table.orderColumns.user"), sortable: true },
        { key: "order_name", label: this.$t("table.orderColumns.order"), sortable: false },
        { key: "price", label: this.$t("table.orderColumns.price"), class: "align-right", sortable: true },
        { key: "shipping", label: this.$t("table.orderColumns.shipping"), class: "align-right", sortable: true },
        { key: "packing", label: this.$t("table.orderColumns.packing"), class: "align-right", sortable: true },
        { key: "actions", label: "", sortable: false }
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
      width: 200px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 1rem 0;

      .button {
        padding: 0;
        width: 1.6rem;
        height: 1.6rem;
        margin: 0 0.5rem;
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
      flex-direction: column;
      width: 350px;

      .cafe-name {
        color: $primary;
        font-size: 1.3rem;
        font-weight: 500;
      }
    }
    .order-user {
      display: flex;
      justify-content: center;
      align-items: center;

      label {
        margin-right: 1rem;
      }

      .form-group {
        margin-bottom: 0;
      }

      .openable-options {
        top: 33px;
      }
    }
  }

  .table-responsive {
    margin-bottom: 0;
    border-bottom: 1px solid $input-border-color;
  }

  .action-buttons {
    display: flex;
    justify-content: center;

    i {
      padding: 2px 8px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
