<template>
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
</template>

<script>
import FormButton from "@/components/controls/FormButton"
import OrderFormModal from "@/views/modals/OrderFormModal"
import { ApiEndpoints } from "@/enums/apiEndpoints"

export default {
  name: "OrderMenu",
  components: { OrderFormModal, FormButton },
  data() {
    return {
      topCafe: []
    }
  },
  mounted() {
    if (process.env.VUE_APP_ENV === "dev") {
      this.getVoteResults()
    } else {
      window.setInterval(this.getVoteResults, 2000)
    }
  },
  methods: {
    cafeMakeOrder(cafe) {
      this.$refs.orderDataModal.show(cafe)
    },
    getVoteResults() {
      this.$axios
        .get(ApiEndpoints.CAFE_HEADER)
        .then((response) => {
          if (response && response.data) {
            this.topCafe = response.data.cafes
            this.$store.commit("global/isVotesOpened", !response.data.closed)
            this.$store.dispatch("global/setUsersList", response.data.usersList)
          }
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    }
  },
  computed: {
    votesOpened() {
      return this.$store.state.global.votesOpened
    }
  }
}
</script>

<style lang="scss">
@import "../../scss/components/color";

.order-top-bar {
  display: flex;
  align-items: center;

  .order-menu {
    display: flex;
    justify-content: center;
    align-items: center;

    .cafe-button {
      display: flex;
      vertical-align: center;
      height: 100%;
    }
  }

  .order-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

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
</style>
