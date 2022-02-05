<template>
  <div :class="{ selected: selectedItem }" class="menu-item">
    <router-link :to="{ name: routerName }">
      <font-awesome-icon :icon="getFaIcon" />
      {{ title }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    routerName: {
      type: String
    },
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getFaIcon() {
      return `fa-solid ${this.icon}`
    },
    selectedItem() {
      return this.$route.name === this.routerName
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/components/color";

.menu-item {
  position: relative;
  white-space: nowrap;

  a {
    margin: 0 15px;
    padding: 10px 15px 10px 15px;
    display: flex;
    align-items: center;
    color: $default-text-color;
    line-height: 1.45;
    transition: transform 0.25s ease;
    cursor: pointer;

    svg {
      margin-right: 1.1rem;
    }
  }

  &:hover {
    a {
      transform: translateX(5px);
    }
  }

  &.selected,
  :hover,
  :active {
    a {
      background: linear-gradient(118deg, $primary, rgba($primary, 70%));
      box-shadow: 0 0 10px 1px rgba($primary, 70%);
      border-radius: 4px;
      color: $white;
      font-weight: 400;
    }
  }
}
</style>
