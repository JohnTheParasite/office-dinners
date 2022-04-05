<template>
  <div class="content-block cafe-content">
    <div class="actions">
      <div class="per-page">
        {{ $t("table.show") }}
        <div class="container">
          <select-input :options="paginationOptions" :init-value="tableProperties.perPage" @change="onChangePerPage($event)" :required="true" />
        </div>
        {{ $t("table.entries") }}
      </div>
      <div v-if="$authService.isAdministrator()">
        <div class="time-picker" v-if="votesOpened">
          <div class="close-votes-button">
            <slot name="closeVotes"></slot>
          </div>
          <div class="time-picker-element">
            <b-form-timepicker v-model="time" locale="en" right :placeholder="$t('interface.empty')"></b-form-timepicker>
          </div>
          <div class="set-auto-close-time">
            <slot name="setAutoCloseTime"></slot>
          </div>
        </div>
        <div class="open-votes-button" v-if="!votesOpened">
          <slot name="openVotes"></slot>
        </div>
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
      <template #cell(name)="data">
        <a :href="data.item.link" target="_blank">
          {{ data.item.name }}
          <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
        </a>
      </template>
      <template #cell(comments)="data">
        <a href="#" @click="openCommentsModal(data.item.id)">
          {{ data.item.comments.toString() }}
        </a>
      </template>
      <template #cell(rating_food)="data">
        <b-form-rating v-model="data.item.rating_food" readonly></b-form-rating>
      </template>
      <template #cell(rating_delivery)="data">
        <b-form-rating v-model="data.item.rating_delivery" readonly></b-form-rating>
      </template>
      <template #cell(active)="data">
        <toggle :init-value="data.item.active" :name="data.item.id.toString()" @change="toggleCafe"></toggle>
      </template>
      <template #cell(likes)="data">
        <div class="like" :class="{ active: data.item.liked }">
          <div class="like-button" @click="clickLike(data.item.id)" v-if="votesOpened">
            <font-awesome-icon icon="fa-solid fa-heart" />
            {{ $t("interface.like") }}
          </div>
          <div class="like-counter">{{ data.item.likes }}</div>
        </div>
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
    <comments-form-modal ref="commentsFormModal" />
  </div>
</template>

<script>
import DataTable from "@/components/dataTable/DataTable"
import Toggle from "@/components/controls/Toggle"
import { ApiEndpoints } from "@/enums/apiEndpoints"
import FormDataService from "@/services/formDataService"
import SelectInput from "@/components/controls/SelectInput"
import CommentsFormModal from "@/views/modals/CommentsFormModal"
import ApiErrorHelper from "@/services/apiErrorHelper"

export default {
  name: "CafeDataTable",
  components: { CommentsFormModal, SelectInput, Toggle },
  mixins: [DataTable, ApiErrorHelper],
  data() {
    return {
      time: this.setTime(),
      votesClosed: true
    }
  },
  methods: {
    openCommentsModal(cafeId) {
      this.$refs.commentsFormModal.show(cafeId)
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
    },
    onChangePerPage(value) {
      this.tableProperties.perPage = value
    },
    clickLike(value) {
      this.$axios
        .post(
          ApiEndpoints.VOTE,
          FormDataService.getFormData({
            cafe_id: value
          })
        )
        .catch((error) => {
          this.catchAxiosError(error)
        })
      this.$emit("refreshTable")
    },
    setTime() {
      let currentDate = new Date()
      currentDate.setTime(currentDate.getTime() + 30 * 60 * 1000)
      return currentDate.getHours() + ":" + currentDate.getMinutes()
    }
  },
  computed: {
    getColumns() {
      return [
        { key: "active", label: this.$t("table.columns.active"), sortable: true },
        { key: "likes", label: this.$t("table.columns.vote"), class: "align-center", sortable: true },
        { key: "name", label: this.$t("table.columns.name"), sortable: true },
        { key: "rating_food", label: this.$t("table.columns.rating_food"), sortable: true },
        { key: "rating_delivery", label: this.$t("table.columns.rating_delivery"), sortable: true },
        { key: "comments", label: this.$t("table.columns.comments"), class: "align-right", sortable: true },
        { key: "last_order_date", label: this.$t("table.columns.last_order_date"), sortable: true },
        { key: "actions", label: "", sortable: false }
      ]
    },
    votesOpened() {
      return this.$store.state.basic.votesOpened
    }
  }
}
</script>

<style lang="scss">
@import "../../scss/components/color";

.container {
  margin-left: 6px;
  margin-right: 6px;
  width: 66px;

  .openable-options {
    top: 33px;
    left: 0;
  }
}
.cafe-content {
  .toggle {
    margin-bottom: 0;
  }
}

.like {
  display: flex;
  justify-content: center;
  font-size: 0.8rem;
  gap: 4px;

  .like-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $white;
    padding: 4px 12px;
    border: 1px solid $primary;
    border-radius: 4px;
    cursor: pointer;
    color: $primary;
    transition: 0.3s ease;

    svg {
      margin-right: 6px;
    }

    &:hover {
      color: $white;
      box-shadow: 0 8px 25px -8px $primary;
      border-color: $primary;
      background-color: $primary;
    }
  }

  .like-counter {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $primary;
    border-radius: 4px;
    margin: 4px 0;
    width: 1.5rem;
    background-color: $primary;
    color: $white;
  }
}

.active {
  .like-button {
    color: $white;
    background-color: $primary;
  }
}

.time-picker {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  .time-picker-element {
    width: 125px;
  }
}
</style>
