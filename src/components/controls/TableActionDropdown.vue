<template>
  <div class="openable-container" :class="{ show: showOpenable }">
    <div class="icon-button" @click="toggleOpenable">
      <fa-icon icon="ellipsis-v"></fa-icon>
    </div>
    <div class="openable-options">
      <div class="option" @click="onClickEdit(objectId)">
        <fa-icon icon="edit"></fa-icon>
        {{ $t("table.edit") }}
      </div>
      <div class="option" @click="onClickDelete(objectId)">
        <fa-icon icon="trash"></fa-icon>
        {{ $t("table.delete") }}
      </div>
    </div>
  </div>
</template>

<script>
import openableItem from "@/components/controls/openableItem"
import FaIcon from "@/components/icons/FaIcon"

export default {
  name: "TableActionDropdown",
  components: { FaIcon },
  mixins: [openableItem],
  props: {
    objectId: {
      type: Number,
      required: true
    },
    onClickDelete: {
      type: Function
    },
    onClickEdit: {
      type: Function
    },
    options: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.openable-container {
  position: relative;
  display: flex;
  justify-content: flex-end;

  .icon-button {
    cursor: pointer;
    text-align: center;
    padding: 0.786rem 1.5rem;
  }
}
</style>
