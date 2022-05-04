<template>
  <div class="order-buttons">
    <label v-if="votesOpened">{{ $t("order.top3") }}</label>
    <label v-else>{{ $t("order.clickToOrder") }}</label>
    <div class="divider"></div>
    <div v-if="votesOpened" class="order-top-bar">
      <div class="order-menu">
        <div v-for="item in topCafe" :key="item.id" class="cafe-with-counter">
          <div class="cafe-button">
            {{ item.name }}
          </div>
          <div class="like-counter">{{ item.likes }}</div>
        </div>
      </div>
    </div>
    <div v-else class="order-top-bar">
      <div class="order-menu">
        <div v-for="item in topCafe" :key="item.id" class="cafe-button">
          <form-button :label="item.name" size="btn-sm" type="success" @click="cafeMakeOrder(item)" />
        </div>
      </div>
      <order-form-modal ref="orderDataModal"></order-form-modal>
    </div>
  </div>
</template>

<script>
import FormButton from "@/components/controls/FormButton"
import OrderFormModal from "@/views/modals/OrderFormModal"
import ApiErrorHelper from "@/services/apiErrorHelper"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import { socketBus } from "@/eventBuses/eventBuses"

export default {
  name: "OrderMenu",
  components: { OrderFormModal, FormButton },
  mixins: [ApiErrorHelper],
  data() {
    return {
      topCafe: [],
      intervalId: 0
    }
  },
  mounted() {
    this.getVoteResults()
    socketBus.$on("newData", (messageEvent) => {
      try {
        let data = JSON.parse(messageEvent.data)
        if (data.header) {
          this.updateFromSocketData(data.header)
        }
      } catch (exception) {
        console.error("If you see this, please tell your administrator about this exception", exception)
      }
    })
  },
  beforeDestroy() {
    window.clearInterval(this.intervalId)
  },
  methods: {
    cafeMakeOrder(cafe) {
      this.$refs.orderDataModal.show(cafe)
    },
    updateFromSocketData(data) {
      this.topCafe = data.cafes
      this.$store.commit("basic/isVotesOpened", !data.closed)
      this.$store.dispatch("basic/setFromHeaderData", data)
    },
    getVoteResults() {
      this.$axios
        .get(ApiEndpoints.CAFE_HEADER)
        .then((response) => {
          if (response && response.data) {
            this.topCafe = response.data.cafes
            this.$store.commit("basic/isVotesOpened", !response.data.closed)
            this.$store.dispatch("basic/setFromHeaderData", response.data)
          }
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    }
  },
  computed: {
    votesOpened() {
      return this.$store.state.basic.votesOpened
    }
  }
}
</script>

<style lang="scss">
@import "../../scss/components/color";

.order-buttons {
  .divider {
    border-bottom: 1px solid $default-text-color;
    margin: 0.3rem 0 0.6rem 0;
  }

  .order-top-bar {
    display: flex;
    align-items: center;

    .order-menu {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      .cafe-button {
        display: flex;
        vertical-align: center;
        height: 100%;
      }

      .cafe-with-counter {
        display: flex;

        .cafe-button {
          padding: 4px 12px;
          border: 1px solid $primary;
          border-radius: 4px;
          color: $primary;
          transition: 0.3s ease;
          margin-right: 0;
        }

        .like-counter {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid $primary;
          border-radius: 4px;
          margin: 4px 8px 4px 4px;
          width: 1.5rem;
          background-color: $primary;
          color: $white;
        }
      }
    }
  }
}
</style>
