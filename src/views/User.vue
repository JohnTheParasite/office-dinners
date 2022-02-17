<template>
  <div class="router-container">
    <data-table :items="items" :on-click-edit="openEdit" :on-filter-change="updateResults" :pagination="pagination" :total="items.length">
      <form-button slot="actionButton" label="user.add" @click="onclick"></form-button>
    </data-table>
    <user-form-modal ref="userDataModal" @refreshTable="getItems"></user-form-modal>
  </div>
</template>

<script>
import DataTable from "@/components/dataTable/DataTable"
import FormButton from "@/components/controls/FormButton"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import FormDataService from "@/services/formDataService"
import ApiErrorHelper from "@/services/apiErrorHelper"
import UserFormModal from "@/views/modals/UserFormModal"

export default {
  name: "User",
  components: { UserFormModal, FormButton, DataTable },
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
        .get(ApiEndpoints.USER_LIST, { params: this.tableProperties })
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
    openEdit(userId) {
      this.$refs.userDataModal.show(userId)
    },
    onclick() {
      this.$refs.userDataModal.show()
    }
  }
}
</script>

<style scoped></style>
