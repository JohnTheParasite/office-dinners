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
      <form-button slot="actionButton" label="cafe.add"></form-button>
    </data-table>
  </div>
</template>

<script>
import DataTable from "@/components/dataTable/DataTable"
import FormButton from "@/components/controls/FormButton"
import ApiErrorHelper from "@/services/apiErrorHelper"
import FormDataService from "@/services/formDataService"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import i18n from "@/i18n"

export default {
  name: "Cafe",
  components: { FormButton, DataTable },
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
        .get(ApiEndpoints.CAFE_LIST, { params: props })
        .then((response) => {
          if (response && response.data) {
            this.items = this.addItemProperties(response.data.items)
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
