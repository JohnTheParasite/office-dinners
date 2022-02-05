<template>
  <div class="router-container cafe-orders-page">
    <div class="content-block date-block">
      <label class="dateLabel">{{ $t("order.orderDate") }}:</label>
      <div class="date-picker">
        <button class="button" @click="changeDate(-1)">
          <font-awesome-icon icon="fa-solid fa-chevron-left" />
        </button>
        <div class="datepicker-element">
          <b-form-datepicker
            v-model="date"
            :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
            :placeholder="$t('interface.noDate')"
            class="mb-2"
            right
            :max="new Date()"
            start-weekday="1"
            @context="updateFromCalendar"
            @input="updateFromCalendar"
          ></b-form-datepicker>
        </div>
        <button class="button" @click="changeDate(1)">
          <font-awesome-icon icon="fa-solid fa-chevron-right" />
        </button>
      </div>
    </div>
    <div v-if="loadInProgress">
      <div class="content-block">
        <div class="loader">
          <css-loader></css-loader>
        </div>
      </div>
    </div>
    <template v-else>
      <template v-if="orders.length > 0">
        <cafe-orders v-for="cafeData in orders" :key="cafeData.id" :cafe-data="cafeData" @updateOrders="updateOrders"></cafe-orders>
      </template>
      <div class="content-block no-orders" v-else>
        {{ $t("order.noOrdersForToday") }}
      </div>
    </template>
  </div>
</template>

<script>
import CafeOrders from "@/components/dataTable/CafeOrders"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import CssLoader from "@/components/CssLoader"
import FormDataService from "@/services/formDataService"
import ApiErrorHelper from "@/services/apiErrorHelper"

export default {
  name: "Orders",
  components: { CssLoader, CafeOrders },
  mixins: [ApiErrorHelper],
  data() {
    return {
      loadInProgress: false,
      date: FormDataService.formatDateWithLeadingZeroes(new Date()),
      orders: []
    }
  },
  methods: {
    changeDate(daysAmount) {
      let date = new Date(this.date)
      date.setDate(date.getDate() + daysAmount)
      this.date = FormDataService.formatDateWithLeadingZeroes(date)
    },
    updateFromCalendar() {
      this.loadInProgress = true
      this.updateOrders()
    },
    updateOrders() {
      this.$axios
        .get(ApiEndpoints.ORDERS_GET + "?date=" + this.date)
        .then((response) => {
          if (response && response.data) {
            this.orders = response.data
            this.loadInProgress = false
          }
        })
        .catch((error) => {
          this.catchAxiosError(error)
          this.loadInProgress = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
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
        border: 1px solid #7367f0;
        border-radius: 4px;
        margin: 4px 8px;
        width: 1.6rem;
        background-color: #7367f0;
        color: #fff;
        cursor: pointer;
        height: 1.6rem;
        font-size: 0.6rem;
        text-align: center;
      }
    }
  }

  .loader,
  .no-orders {
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
}
</style>
