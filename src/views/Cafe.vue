<template>
  <div class="router-container">
    <cafe-data-table :items="items" :on-click-edit="openEdit" :on-filter-change="updateResults" :pagination="pagination" :total="items.length">
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
            // this.tableProperties = response.data.tableProperties
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
    }
  }
}
</script>

<style scoped></style>
