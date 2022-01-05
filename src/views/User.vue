<template>
  <div class="router-container">
    <data-table
      :items="items"
      :on-click-delete="openDelete"
      :on-click-edit="openEdit"
      :on-filter-change="updateResults"
      :pagination="pagination"
      :total="items.length"
    >
      <form-button slot="actionButton" label="user.add" @click="onclick"></form-button>
    </data-table>
    <user-form-modal ref="UserDataModal" @refreshTable="refreshTable"></user-form-modal>
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
    openEdit(userId) {
      this.$refs.UserDataModal.show(userId)
    },
    openDelete(userId) {
      console.warn(userId)
    },
    onclick() {
      this.$refs.UserDataModal.show()
    },
    refreshTable() {
      this.getItems(this.tableProperties)
    }
  }
}
</script>

<style scoped></style>
