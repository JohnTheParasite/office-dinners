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
    >
      <template #empty="">
        <span class="text-primary"> {{ $t("table.noItems") }} </span>
      </template>
      <template #cell()="data">
        <span v-html="data.value"></span>
      </template>
      <template #cell(comments)="data">
        <a href="#" @click="openCommentsModal(data.item.id)">
          {{ data.item.comments.toString() }}
        </a>
      </template>
      <template #cell(rating)="data">
        <b-form-rating v-model="data.item.rating" readonly></b-form-rating>
      </template>
      <template #cell(active)="data">
        <toggle :init-value="data.item.active" :name="data.item.id.toString()" @change="toggleCafe"></toggle>
      </template>
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
import DataTable from "@/components/dataTable/DataTable"
import Toggle from "@/components/controls/Toggle"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import FormDataService from "@/services/formDataService"

export default {
  name: "CafeDataTable",
  components: { Toggle },
  mixins: [DataTable],
  methods: {
    openCommentsModal(cafeId) {
      console.warn(cafeId)
    },
    toggleCafe(event, value) {
      this.$axios
        .post(
          ApiEndpoints.TOGGLE_CAFE,
          FormDataService.getFormData({
            cafeId: value.name,
            select: event
          })
        )
        .then((response) => {
          if (response && response.data) {
            this.$store.commit("toasts/addSuccessToast", event ? "cafe.cafeSelected" : "cafe.cafeDeselected")
          }
        })
        .catch((error) => {
          this.catchAxiosError(error)
        })
    }
  }
}
</script>