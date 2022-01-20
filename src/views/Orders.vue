<template>
  <div class="router-container">
    <div class="table-container" v-for="cafe in cafeItems" :key="cafe.cafeId">
      <div class="content-block">
        <div class="cafe-actions">
          <div class="cafe-name-link">
            <label class="cafe-name"> {{ cafe.cafeName }} </label>
            <a class="cafe-link" :href="cafe.link" target="_blank"> {{ cafe.link }} </a>
          </div>
          <div class="date-picker">
            <form-button label="<" class="dec-button" type="secondary" @click="cafe.date = changeDate(cafe.date, -1)"></form-button>
            <b-form-datepicker
              id="example-datepicker"
              v-model="cafe.date"
              class="mb-2"
              start-weekday="1"
              right
              :placeholder="$t('interface.noDate')"
            ></b-form-datepicker>
            <form-button label=">" class="dec-button" type="secondary" @click="cafe.date = changeDate(cafe.date, 1)"></form-button>
          </div>
          <div class="order-user" v-if="currentUserIsAdmin">
            <label>{{ $t("order.user") }}</label>
            <select-input :options="users" :init-value="cafe.orderUser" />
          </div>
          <div class="order-button">
            <form-button label="interface.order" @click="makeOrder()"></form-button>
          </div>
        </div>

        <b-table :items="cafe.orders" primary-key="id" responsive show-empty>
          <template #empty="">
            <span class="text-primary"> {{ $t("table.noItems") }} </span>
          </template>
        </b-table>

        <div class="footer">
          <label>Result: 3.50</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiErrorHelper from "@/services/apiErrorHelper"
import FormButton from "@/components/controls/FormButton"
import SelectInput from "@/components/controls/SelectInput"

export default {
  name: "Orders",
  components: { SelectInput, FormButton },

  mixins: [ApiErrorHelper],
  data() {
    return {
      cafeItems: [
        {
          cafeName: "Pasibus",
          cafeId: "1",
          link: "https://www.pasidostawa.pl/pasibus-pasaz-grunwaldzki",
          date: "",
          orderUser: "",
          orders: [
            {
              user: "Иван",
              order: "печеньки",
              price: 3.14,
              deliveryPrice: 0.16,
              packingPrice: 1
            },
            {
              user: "Игорь",
              order: "хлебные корочки",
              price: 3.16,
              deliveryPrice: 0.14,
              packingPrice: 1
            },
            {
              user: "Саня",
              order: "Чего нибудь набрать до сотки",
              price: 3.16,
              deliveryPrice: 0.14,
              packingPrice: 1
            }
          ]
        },
        {
          cafeName: "Słowianka",
          cafeId: "2",
          link: "https://www.pyszne.pl/menu/slowianka-jednosci-narodowej",
          date: "",
          orderUser: "",
          orders: [
            {
              user: "Иван",
              order: "чаю",
              price: 3.14,
              deliveryPrice: 0.16,
              packingPrice: 1
            },
            {
              user: "Игорь",
              order: "оладушки",
              price: 4.16,
              deliveryPrice: 0.14,
              packingPrice: 1
            },
            {
              user: "Саня",
              order: "Чего нибудь еще бы",
              price: 5.16,
              deliveryPrice: 0.14,
              packingPrice: 1
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
  beforeMount() {
    //this.getItems()
  },
  methods: {
    changeDate(dateString, daysAmount) {
      if (!dateString.length) {
        return ""
      }

      let date = new Date(dateString)
      date.setDate(date.getDate() + daysAmount)

      let month = "" + (date.getMonth() + 1)
      let day = "" + date.getDate()
      let year = date.getFullYear()

      return year + "-" + month + "-" + day
    },
    makeOrder() {}
  },
  computed: {
    currentUserIsAdmin() {
      return this.$authService.getUserData().roleId < 2
    }
  }
}
</script>

<style scoped lang="scss">
@import "../scss/components/color";

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
    .cafe-link {
      font-size: 0.9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .date-picker {
    width: 380px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .dec-button {
      padding: 0;
      width: 1.6rem;
      height: 1.6rem;
      margin: 0 0.5rem;
    }
  }

  .order-user {
    display: flex;
    justify-content: center;
    align-items: center;

    label {
      margin-right: 1rem;
    }
  }
}

.footer {
  display: flex;
  align-items: center;
  background-color: $table-header-bg;
  height: 3rem;
  overflow: auto;
  justify-content: right;

  label {
    font-weight: 600;
    margin-right: 1.5rem;
  }
}

.form-group {
  margin-bottom: 0 !important;
}
</style>
