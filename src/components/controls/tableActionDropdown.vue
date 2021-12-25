<template>
  <div class="table-action-dropdown">
    <div class="icon-button" @click="toggleOpenable">
      <fa-icon icon="ellipsis-v"></fa-icon>
    </div>
    <div :class="{ show: showOpenable }" class="openable-options">
      <div class="option">
        <fa-icon icon="edit"></fa-icon>
        {{ $t("edit") }}
      </div>
      <div class="option">
        <fa-icon icon="trash"></fa-icon>
        {{ $t("delete") }}
      </div>
    </div>
  </div>
</template>

<script>
import openableItem from "@/components/controls/openableItem"
import FaIcon from "@/components/icons/FaIcon"

export default {
  name: "tableActionDropdown",
  components: { FaIcon },
  mixins: [openableItem],
  props: {
    options: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.table-action-dropdown {
  position: relative;

  .icon-button {
    cursor: pointer;
    flex: 1 1 auto;
    text-align: center;
    padding: 0.786rem 1.5rem;
  }
}
</style>
