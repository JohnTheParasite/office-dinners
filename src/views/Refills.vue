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

export default {
  name: "Refills",
  components: { RefillFormModal, DataTable },
  data() {
    return {
      items: [],
      tableProperties: {},
      pagination: {}
    }
  },
  beforeMount() {
    this.getItems()
  },
  methods: {
    getItems(props) {
      if (props === undefined) {
        props = FormDataService.getDefaultListParameters()
      }
      this.$axios
        .get(ApiEndpoints.USER_LIST, { params: props })
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
      this.getItems(this.tableProperties)
    },
    openRefillModal(userId) {
      this.$refs.refillModal.show(userId)
    },
    applyBalance(userId, balance) {
      console.log(userId)
      console.log(balance)
      this.$refs.refillModal.hide()
    }
  }
}
</script>
