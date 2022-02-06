<template>
  <div class="router-container">
    <cafe-data-table
      ref="cafeDataTable"
      :items="items"
      :on-click-edit="openEdit"
      :on-filter-change="updateResults"
      :pagination="pagination"
      :total="items.length"
      @refreshTable="refreshTable"
    >
      <form-button slot="closeVotes" label="cafe.closeVotes" @click="onclickOpenCloseVotes"></form-button>
      <form-button slot="openVotes" label="cafe.openVotes" @click="onclickOpenCloseVotes"></form-button>
      <form-button slot="setAutoCloseTime" label="cafe.setAutoCloseTime" @click="onclickSetTimer"></form-button>
      <form-button slot="actionButton" label="cafe.add" @click="onclickAddCafe"></form-button>
    </cafe-data-table>
    <cafe-form-modal ref="cafeDataModal" @refreshTable="refreshTable" />
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

export default {
  name: "Cafe",
  components: { CafeFormModal, CafeDataTable, FormButton },
  mixins: [ApiErrorHelper],
  data() {
    return {
      items: [],
      tableProperties: FormDataService.getDefaultListParameters(),
      pagination: {}
    }
  },
  beforeMount() {
    this.getItems()
  },
  mounted() {
    if (process.env.VUE_APP_ENV === "dev") {
      this.refreshTable()
    } else {
      window.setInterval(this.refreshTable, 2000)
    }
  },
  methods: {
    getItems(props) {
      if (props === undefined) {
        props = FormDataService.getDefaultListParameters()
      }
      this.$axios
        .get(ApiEndpoints.CAFE_LIST, { params: props })
        .then((response) => {
          if (response && response.data) {
            this.items = this.addItemProperties(response.data.items)
            this.pagination = response.data.pagination
          }
        })
        .catch((error) => {
          this.catchAxiosError(error)
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
      this.getItems(this.tableProperties)
    },
    openEdit(cafeId) {
      this.$refs.cafeDataModal.show(cafeId)
    },
    refreshTable() {
      this.getItems(this.tableProperties)
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

<style scoped></style>
