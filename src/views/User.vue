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
      <form-button slot="actionButton" label="user.add"></form-button>
    </data-table>
  </div>
</template>

<script>
import DataTable from "@/components/dataTable/DataTable"
import FormButton from "@/components/controls/FormButton"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import FormDataService from "@/services/formDataService"
import AuthService from "@/services/authService"

export default {
  name: "User",
  components: { FormButton, DataTable },
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
    processErrorCode(errorCode) {
      let errorMessage = "errors.serverError"
      if (errorCode === 401) {
        AuthService.logoutUser()
        this.$router.push("/")
      } else if (errorCode === 404) {
        errorMessage = "errors.pageNotFound"
      }
      this.$store.commit("toasts/addDangerToast", errorMessage)
    },
    getItems(props) {
      if (props === undefined) {
        props = FormDataService.getDefaultListParameters()
      }
      this.$axios
        .get(ApiEndpoints.USER_LIST, { params: props })
        .then((response) => {
          if (response && response.data) {
            this.items = response.data.items
            this.tableProperties = response.data.tableProperties
            this.pagination = response.data.pagination
          }
        })
        .catch((error) => {
          if (error.response) {
            this.processErrorCode(error.response.data.status)
          } else if (error.request) {
            this.$store.commit("toasts/addDangerToast", error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            this.$store.commit("toasts/addDangerToast", "errors.serverError")
          }
        })
    },
    updateResults(tableProperties) {
      this.tableProperties = tableProperties
      this.getItems(this.tableProperties)
    },
    openEdit(userId) {
      console.warn(userId)
    },
    openDelete(userId) {
      console.warn(userId)
    }
  }
}
</script>

<style scoped></style>
