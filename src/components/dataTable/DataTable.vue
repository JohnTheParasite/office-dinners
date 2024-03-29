<template>
  <div class="content-block">
    <div class="actions">
      <div class="per-page">
        {{ $t("table.show") }}
        <div class="container">
          <select-input :init-value="tableProperties.perPage" :options="paginationOptions" :required="true" @change="onChangePerPage($event)" />
        </div>
        {{ $t("table.entries") }}
      </div>
      <div class="search-actions">
        <text-input :debounce="true" placeholder="search" @input="search($event)"></text-input>
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
      hover
    >
      <template #empty="">
        <span class="text-primary"> {{ $t("table.noItems") }} </span>
      </template>
      <template #cell()="data">
        <span v-html="data.value"></span>
      </template>
      <template #cell(active)="data">
        {{ $t(data.item.active) }}
      </template>
      <template #cell(actions)="data">
        <div class="action-button" @click="() => onClickEdit(data.item.id)">
          <font-awesome-icon icon="fa-solid fa-pencil" />
        </div>
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
import TextInput from "@/components/controls/TextInput"
import FormDataService from "@/services/formDataService"
import SelectInput from "@/components/controls/SelectInput"

export default {
  name: "DataTable",
  components: { SelectInput, TextInput },
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
    onClickEdit: {
      type: Function
    }
  },
  data() {
    return {
      tableProperties: FormDataService.getDefaultListParameters(),
      paginationOptions: FormDataService.getDefaultPaginationOptions()
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
          label: this.$t("table.columns." + k),
          sortable: true,
          class: `table-column-${k}`
        }
      })
      if (this.withActions) {
        columns.push({ key: "actions", label: "", class: `table-column-actions` })
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
    },
    onChangePerPage(value) {
      this.tableProperties.perPage = value
    }
  }
}
</script>

<style lang="scss">
@import "../../scss/components/color";

.action-button {
  cursor: pointer;
}

.actions,
.bottom-information {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .per-page {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $input-label-color;
    font-size: 1rem;

    .container {
      margin-left: 6px;
      margin-right: 6px;
      width: 70px;

      .openable-options {
        top: 33px;
        left: 0;
      }

      .form-group {
        margin-bottom: 0;
      }
    }
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
