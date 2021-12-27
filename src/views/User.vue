<template>
  <div class="router-container">
    <data-table
      :items="getItems"
      :pagination="pagination"
      :on-click-edit="openEdit"
      :on-click-delete="openDelete"
      :on-filter-change="updateResults"
      :total="items.length"
    >
      <form-button slot="actionButton" label="user.add"></form-button>
    </data-table>
  </div>
</template>

<script>
import DataTable from "@/components/dataTable/DataTable"
import FormButton from "@/components/controls/FormButton"

export default {
  name: "User",
  components: { FormButton, DataTable },
  data() {
    return {
      items: [
        { id: 1, name: "Adsadsa", surname: "YUhjn", email: "Macdonald@dsadsa.cpm", active: false },
        { id: 2, name: "Bfsdfds", surname: "NMdhsja", email: "CZKJKL9", active: false },
        { id: 3, name: "Yersaddas", surname: "UIXzjn", email: "SAac3", active: false },
        { id: 4, name: "Vasadsa", surname: "JNMwq[p", email: "323232", active: true },
        { id: 5, name: "Adsadsa", surname: "YUhjn", email: "Macdonald@dsadsa.cpm", active: false },
        { id: 6, name: "Bfsdfds", surname: "NMdhsja", email: "CZKJKL9", active: false },
        { id: 7, name: "Yersaddas", surname: "UIXzjn", email: "SAac3", active: false },
        { id: 8, name: "Vasadsa", surname: "JNMwq[p", email: "323232", active: true },
        { id: 9, name: "Adsadsa", surname: "YUhjn", email: "Macdonald@dsadsa.cpm", active: false },
        { id: 10, name: "Bfsdfds", surname: "NMdhsja", email: "CZKJKL9", active: false },
        { id: 11, name: "Yersaddas", surname: "UIXzjn", email: "SAac3", active: false },
        { id: 12, name: "Vasadsa", surname: "JNMwq[p", email: "323232", active: true },
        { id: 13, name: "Adsadsa", surname: "YUhjn", email: "Macdonald@dsadsa.cpm", active: false },
        { id: 14, name: "Bfsdfds", surname: "NMdhsja", email: "CZKJKL9", active: false },
        { id: 15, name: "Yersaddas", surname: "UIXzjn", email: "SAac3", active: false },
        { id: 16, name: "Vasadsa", surname: "JNMwq[p", email: "323232", active: true },
        { id: 17, name: "OPdslakj", surname: "WDs33", email: "ASdsa88as8", active: false }
      ],
      tableProperties: {
        perPage: 50,
        currentPage: 1,
        searchValue: ""
      },
      pagination: {
        from: 1,
        to: 10,
        total: 17
      }
    }
  },
  computed: {
    getItems() {
      let items = this.items.slice(
        this.tableProperties.perPage * (this.tableProperties.currentPage - 1),
        this.tableProperties.perPage * this.tableProperties.currentPage
      )
      return items.filter((n) => n.name.indexOf(this.tableProperties.searchValue) > -1 || n.surname.indexOf(this.tableProperties.searchValue) > -1)
    }
  },
  methods: {
    updateResults(tableProperties) {
      this.tableProperties = tableProperties
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
