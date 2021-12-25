<template>
  <div class="content-block">
    <div class="actions">
      <div class="per-page">
        Show
        <select v-model="perPage">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        entries
      </div>
      <div class="search-actions">
        <text-input placeholder="search" @input="search($event)"></text-input>
        <form-button label="user.add"></form-button>
      </div>
    </div>
    <b-table :fields="tableColumns" :items="getItems" :sort-by.sync="sortKey" :sort-desc.sync="isSortDirDesc" primary-key="id" responsive show-empty>
      <template #cell(actions)="data">
        <table-action-dropdown :data="data"></table-action-dropdown>
      </template>
    </b-table>
    <div class="bottom-information">
      <div class="text-muted">
        {{ $t("table.showItems", { from: 1, to: 20, total: 50 }) }}
      </div>
      <div class="pagination">
        <b-pagination
          v-model="currentPage"
          :total-rows="items.length"
          :per-page="perPage"
          first-number
          last-number
          class="mb-0 mt-1 mt-sm-0"
          prev-class="prev-item"
          next-class="next-item"
        >
          <template #prev-text><span></span></template>
          <template #next-text><span></span></template>
        </b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import TableActionDropdown from "@/components/controls/tableActionDropdown"
import TextInput from "@/components/controls/TextInput"
import FormButton from "@/components/controls/FormButton"

export default {
  name: "DataTable",
  components: { FormButton, TextInput, TableActionDropdown },
  data() {
    return {
      sortKey: "id",
      currentPage: 1,
      perPage: 5,
      isSortDirDesc: false,
      searchValue: "",
      items: [
        { name: "Adsadsa", surname: "YUhjn", email: "Macdonald@dsadsa.cpm", active: false },
        { name: "Bfsdfds", surname: "NMdhsja", email: "CZKJKL9", active: false },
        { name: "Yersaddas", surname: "UIXzjn", email: "SAac3", active: false },
        { name: "Vasadsa", surname: "JNMwq[p", email: "323232", active: true },
        { name: "Adsadsa", surname: "YUhjn", email: "Macdonald@dsadsa.cpm", active: false },
        { name: "Bfsdfds", surname: "NMdhsja", email: "CZKJKL9", active: false },
        { name: "Yersaddas", surname: "UIXzjn", email: "SAac3", active: false },
        { name: "Vasadsa", surname: "JNMwq[p", email: "323232", active: true },
        { name: "Adsadsa", surname: "YUhjn", email: "Macdonald@dsadsa.cpm", active: false },
        { name: "Bfsdfds", surname: "NMdhsja", email: "CZKJKL9", active: false },
        { name: "Yersaddas", surname: "UIXzjn", email: "SAac3", active: false },
        { name: "Vasadsa", surname: "JNMwq[p", email: "323232", active: true },
        { name: "Adsadsa", surname: "YUhjn", email: "Macdonald@dsadsa.cpm", active: false },
        { name: "Bfsdfds", surname: "NMdhsja", email: "CZKJKL9", active: false },
        { name: "Yersaddas", surname: "UIXzjn", email: "SAac3", active: false },
        { name: "Vasadsa", surname: "JNMwq[p", email: "323232", active: true },
        { name: "OPdslakj", surname: "WDs33", email: "ASdsa88as8", active: false }
      ],
      tableColumns: [
        { key: "name", sortable: true },
        { key: "surname", sortable: true },
        { key: "email", sortable: true },
        { key: "active", sortable: true },
        { key: "actions" }
      ]
    }
  },
  computed: {
    getItems() {
      return this.items.slice(this.perPage * (this.currentPage - 1), this.perPage * this.currentPage)
    }
  },
  methods: {
    search(value) {
      this.searchValue = value
    }
  }
}
</script>

<style lang="scss" scoped>
.actions,
.bottom-information {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .per-page {
    color: #5e5873;
    font-size: 0.857rem;
  }

  .search-actions {
    display: flex;
    align-items: center;
    gap: 15px;
    .form-group {
      margin: 0;
    }
  }
}
</style>
