<template>
  <div class="router-container">
    <cafe-data-table
      :items="items"
      :on-click-delete="openDelete"
      :on-click-edit="openEdit"
      :on-filter-change="updateResults"
      :pagination="pagination"
      :total="items.length"
    >
      <form-button slot="actionButton" label="cafe.add"></form-button>
    </cafe-data-table>
  </div>
</template>

<script>
import FormButton from "@/components/controls/FormButton"
import ApiErrorHelper from "@/services/apiErrorHelper"
import FormDataService from "@/services/formDataService"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import i18n from "@/i18n"
import CafeDataTable from "@/components/dataTable/CafeDataTable"

export default {
  name: "Cafe",
  components: { CafeDataTable, FormButton },
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
