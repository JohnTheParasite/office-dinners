<template>
  <div class="router-container">
    <div v-if="loadInProgress">
      <div class="content-block">
        <div class="loader">
          <css-loader></css-loader>
        </div>
      </div>
    </div>
    <div v-else>
      <cafe-data-table
        ref="cafeDataTable"
        :items="items"
        :on-click-edit="openEdit"
        :on-filter-change="updateResults"
        :pagination="pagination"
        :total="items.length"
        :total-votes="totalVotes"
      @refreshTable="getItems"
    >
      <form-button slot="closeVotes" label="cafe.closeVotes" @click="onclickOpenCloseVotes"></form-button>
      <form-button slot="openVotes" label="cafe.openVotes" @click="onclickOpenCloseVotes"></form-button>
      <form-button slot="setAutoCloseTime" label="cafe.setAutoCloseTime" @click="onclickSetTimer"></form-button>
      <form-button slot="actionButton" label="cafe.add" @click="onclickAddCafe"></form-button>
    </cafe-data-table>
    <cafe-form-modal ref="cafeDataModal" @refreshTable="getItems" /></div>
  </div>
</template>

<script>
import FormButton from "@/components/controls/FormButton"
import ApiErrorHelper from "@/services/apiErrorHelper"
import FormDataService from "@/services/formDataService"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import i18n from "@/i18n"
import CafeDataTable from "@/components/dataTable/CafeDataTable"
import CafeFormModal from "@/views/modals/CafeFormModal"
import CssLoader from "@/components/CssLoader"
import { socketBus } from "@/eventBuses/eventBuses"

export default {
  name: "Cafe",
  components: { CssLoader, CafeFormModal, CafeDataTable, FormButton },
  mixins: [ApiErrorHelper],
  data() {
    return {
      loadInProgress: false,
      items: [],
      tableProperties: FormDataService.getDefaultListParameters(),
      pagination: {},
      intervalId: 0,
      totalVotes: {}
    }
  },
  beforeMount() {
    this.loadInProgress = true
    this.getItems().finally(() => {
      this.loadInProgress = false
    })
  },
  mounted() {
    this.getItems()
    socketBus.$on("newData", (messageEvent) => {
      try {
        let data = JSON.parse(messageEvent.data)
        if (data.votes) {
          this.totalVotes = data.votes
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
    getItems() {
      return this.$axios
        .get(ApiEndpoints.CAFE_LIST, { params: this.tableProperties })
        .then((response) => {
          if (response && response.data) {
            this.items = this.addItemProperties(response.data.items)
            this.pagination = response.data.pagination
            this.getTotalVotes()
          }
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    getTotalVotes() {
      this.$axios.get(ApiEndpoints.CAFE_TOTAL_VOTES).then((response) => {
        if (response && response.data) this.totalVotes = response.data
      })
    },
    addItemProperties(items) {
      items.forEach((item) => {
        item.last_order_date = item.last_order_date === "interface.never" ? i18n.t("interface.never") : item.last_order_date
      })
      return items
    },
    updateResults(tableProperties) {
      this.tableProperties = tableProperties
      this.getItems()
    },
    openEdit(cafeId) {
      this.$refs.cafeDataModal.show(cafeId)
    },
    onclickAddCafe() {
      this.$refs.cafeDataModal.show()
    },
    onclickOpenCloseVotes() {
      let endpoint = ApiEndpoints.VOTES_OPEN
      if (this.votesOpened) {
        endpoint = ApiEndpoints.VOTES_CLOSE
      }
      this.$axios
        .post(endpoint)
        .then((response) => {
          if (response && response.data) {
            this.$store.commit("toasts/addSuccessToast", this.votesOpened ? "cafe.votesClosed" : "cafe.votesOpened")
          }
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    onclickSetTimer() {
      this.$axios
        .post(ApiEndpoints.VOTES_AUTOCLOSE, FormDataService.getFormData({ time: this.$refs.cafeDataTable.$data.time }))
        .then((response) => {
          if (response && response.data) {
            this.$store.commit("toasts/addSuccessToast", "cafe.votesTimeoutSet")
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

<style lang="scss" scoped></style>
