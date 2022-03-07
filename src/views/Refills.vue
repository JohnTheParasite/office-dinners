<template>
  <div class="router-container refills-block">
    <div class="content-block">
      <data-table :items="items" :on-click-edit="openRefillModal" :on-filter-change="updateResults" :pagination="pagination" :total="items.length"></data-table>
    </div>
    <refill-form-modal ref="refillModal" :apply="applyBalance"></refill-form-modal>
  </div>
</template>

<script>
import DataTable from "@/components/dataTable/DataTable"
import FormDataService from "@/services/formDataService"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import RefillFormModal from "@/views/modals/RefillFormModal"
import ApiErrorHelper from "@/services/apiErrorHelper"

export default {
  name: "Refills",
  components: { RefillFormModal, DataTable },
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
  methods: {
    getItems() {
      this.$axios
        .get(ApiEndpoints.USER_REFILLS, { params: this.tableProperties })
        .then((response) => {
          if (response && response.data) {
            this.items = response.data.items
            this.pagination = response.data.pagination
          }
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    },
    updateResults(tableProperties) {
      this.tableProperties = tableProperties
      this.getItems()
    },
    openRefillModal(userId) {
      this.$refs.refillModal.show(userId)
    },
    applyBalance(userId, balance) {
      this.$axios
        .patch(ApiEndpoints.USER_REFILL, { user_id: userId, value: balance })
        .then((response) => {
          if (response) {
            this.$store.commit("toasts/addSuccessToast", "refill.balanceUpdated")
            this.$refs.refillModal.hide()
            this.getItems()
          }
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    }
  }
}
</script>

<style lang="scss">
.table-column-balance,
.table-column-actions {
  text-align: right;
}
</style>
