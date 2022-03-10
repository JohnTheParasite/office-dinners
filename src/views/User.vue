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
      <data-table :items="items" :on-click-edit="openEdit" :on-filter-change="updateResults" :pagination="pagination" :total="items.length">
        <form-button slot="actionButton" label="user.add" @click="onclick"></form-button>
      </data-table>
      <user-form-modal ref="userDataModal" @refreshTable="getItems"></user-form-modal>
    </div>
  </div>
</template>

<script>
import DataTable from "@/components/dataTable/DataTable"
import FormButton from "@/components/controls/FormButton"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import FormDataService from "@/services/formDataService"
import ApiErrorHelper from "@/services/apiErrorHelper"
import UserFormModal from "@/views/modals/UserFormModal"
import CssLoader from "@/components/CssLoader"

export default {
  name: "User",
  components: { CssLoader, UserFormModal, FormButton, DataTable },
  mixins: [ApiErrorHelper],
  data() {
    return {
      loadInProgress: false,
      items: [],
      tableProperties: FormDataService.getDefaultListParameters(),
      pagination: {}
    }
  },
  beforeMount() {
    this.loadInProgress = true
    this.getItems().finally(() => {
      this.loadInProgress = false
    })
  },
  methods: {
    getItems() {
      return this.$axios
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

<style lang="scss" scoped>
@import "../scss/components/color";

.loader,
.no-orders {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;

  .lds-dual-ring {
    height: 5rem;
    width: 5rem;
  }

  .lds-dual-ring:after {
    border-color: $primary transparent $primary transparent;
    height: 5rem;
    width: 5rem;
  }
}
</style>
