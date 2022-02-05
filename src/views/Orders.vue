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
            @input="updateOrders"
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
          <css-loader></css-loader>
        </div>
      </div>
    </div>
    <cafe-orders v-for="(cafe, index) in cafeItems" v-else :key="index" :cafe-data="cafe" @refresh="refresh"></cafe-orders>
  </div>
</template>

<script>
import CafeOrders from "@/components/dataTable/CafeOrders"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import CssLoader from "@/components/CssLoader"

export default {
  name: "Orders",
  components: { CssLoader, CafeOrders },
  data() {
    return {
      loadInProgress: false,
      date: this.today(),
      cafeItems: []
    }
  },
  beforeMount() {},
  mounted() {},
  methods: {
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
    changeDate(daysAmount) {
      if (!this.date.length) {
        return
      }
      let date = new Date(this.date)
      date.setDate(date.getDate() + daysAmount)
      this.date = this.dateToString(date)
      this.updateOrders()
    },
    refresh() {
      this.updateOrders(false)
    },
    updateOrders(showLoader = true) {
      if (showLoader) {
        this.loadInProgress = true
      }
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
}
</style>
