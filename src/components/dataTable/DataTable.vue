<template>
  <div class="content-block">
    <div class="actions">
      <div class="per-page">
        {{ $t("table.show") }}
        <select v-model="tableProperties.perPage">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        {{ $t("table.entries") }}
      </div>
      <div class="search-actions">
        <text-input placeholder="search" @input="search($event)"></text-input>
        <slot name="actionButton"></slot>
      </div>
    </div>
    <b-table
      :fields="getColumns"
      :items="items"
      :sort-by.sync="tableProperties.sortKey"
      :sort-desc.sync="tableProperties.isSortDirDesc"
      primary-key="id"
      responsive
      show-empty
    >
      <template #cell(actions)="data">
        <table-action-dropdown :object-id="data.item.id" :on-click-delete="onClickDelete" :on-click-edit="onClickEdit"></table-action-dropdown>
      </template>
    </b-table>
    <div class="bottom-information">
      <div class="text-muted">
        {{ $t("table.showItems", { from: pagination.from, to: pagination.to, total: pagination.total }) }}
      </div>
      <div class="pagination">
        <b-pagination
          v-model="tableProperties.currentPage"
          :per-page="tableProperties.perPage"
          :total-rows="pagination.total"
          class="mb-0 mt-1 mt-sm-0"
          first-number
          last-number
          next-class="next-item"
          prev-class="prev-item"
        >
          <template #prev-text><span></span></template>
          <template #next-text><span></span></template>
        </b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import TableActionDropdown from "@/components/controls/TableActionDropdown"
import TextInput from "@/components/controls/TextInput"

export default {
  name: "DataTable",
  components: { TextInput, TableActionDropdown },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      required: true
    },
    withActions: {
      type: Boolean,
      default: true
    },
    onFilterChange: {
      type: Function,
      required: true
    },
    onClickDelete: {
      type: Function
    },
    onClickEdit: {
      type: Function
    }
  },
  data() {
    return {
      tableProperties: {
        sortKey: "id",
        currentPage: 1,
        perPage: 10,
        isSortDirDesc: false,
        searchValue: ""
      }
    }
  },
  computed: {
    getColumns() {
      if (this.items.length === 0) {
        return []
      }
      let columns = Object.keys(this.items[0]).map((k) => {
        return {
          key: k,
          sortable: true
        }
      })
      if (this.withActions) {
        columns.push({ key: "actions", label: "" })
      }
      return columns
    }
  },
  watch: {
    tableProperties: {
      deep: true,
      handler: function (value) {
        this.onFilterChange(value)
      }
    }
  },
  methods: {
    search(value) {
      this.tableProperties.searchValue = value
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/components/color";

.actions,
.bottom-information {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .per-page {
    color: $input-label-color;
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
