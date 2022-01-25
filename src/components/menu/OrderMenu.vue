<template>
  <div class="order-top-bar">
    <div class="order-menu">
      <div class="cafe-button" v-for="item in topCafe" :key="item.id">
        <form-button :label="item.name" @click="cafeMakeOrder(item)" type="success" size="btn-sm" />
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
      topCafe: [
        {
          id: 2,
          name: "Pasibus",
          link: "https://popozzhe.com",
          rating: 4,
          last_order_date: "2021-10-08 11:07:08"
        },
        { id: 3, name: "Słowianka", link: "https://slowianka.com", rating: 3, last_order_date: "sreda" },
        { id: 4, name: "Monster Cook - taniej przez ich stronę", link: "https://monstercook.com", rating: 5, last_order_date: "chetverg" }
      ]
    }
  },
  mounted() {
    this.$axios
      .get(ApiEndpoints.CAFE_HEADER)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data.closed)
          this.$store.commit("global/isVotesOpened", !response.data.closed)
        }
      })
      .catch((error) => {
        this.catchAxiosError(error)
      })
  },
  methods: {
    cafeMakeOrder(cafe) {
      this.$refs.orderDataModal.show(cafe)
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
      margin-right: 1rem;
    }
  }
}
</style>
