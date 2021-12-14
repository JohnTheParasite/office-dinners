<template>
  <div :class="{ selected: selectedItem }" class="menu-item">
    <router-link :to="{ name: routerName }">
      <fa-icon :icon="icon"></fa-icon>
      {{ title }}
    </router-link>
  </div>
</template>

<script>
import FaIcon from "@/components/icons/FaIcon"

export default {
  name: "MenuItem",
  components: { FaIcon },
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
    selectedItem() {
      return this.$route.name === this.routerName
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-item {
  position: relative;
  white-space: nowrap;

  a {
    margin: 0 15px;
    padding: 10px 15px 10px 15px;
    display: flex;
    align-items: center;
    color: #625f6e;
    line-height: 1.45;
    transition: transform 0.25s ease;
    cursor: pointer;

    .fa {
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
      background: linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7));
      box-shadow: 0 0 10px 1px rgb(115 103 240 / 70%);
      border-radius: 4px;
      color: #fff;
      font-weight: 400;
    }
  }
}
</style>
