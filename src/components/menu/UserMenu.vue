<template>
  <div class="openable-container" :class="{ show: showOpenable }">
    <div class="user" @click="toggleOpenable">
      <div class="text">
        <span class="username">{{ getName }}</span>
        <span class="role">{{ getRole }}</span>
      </div>
      <div class="avatar">
        <img src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/13-small.d796bffd.png" />
      </div>
    </div>
    <div class="openable-options">
      <div class="option">
        <font-awesome-icon icon="fa-solid fa-user" />
        {{ $t("interface.profile") }}
      </div>
      <div class="separator"></div>
      <div class="option" @click="logout">
        <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" />
        {{ $t("interface.logout") }}
      </div>
    </div>
  </div>
</template>

<script>
import openableItem from "@/components/controls/openableItem"

export default {
  name: "UserMenu",
  mixins: [openableItem],
  methods: {
    logout: function () {
      this.$authService.logoutUser()
      this.$store.state.toasts.timeoutIdList.forEach((timeoutId) => clearTimeout(timeoutId))
      this.$store.dispatch("toasts/deleteTimeoutsFromList")
      this.$store.dispatch("toasts/removeAllToasts")
      this.$router.push("login")
    }
  },
  computed: {
    getName() {
      return this.$authService.getUserData().name
    },
    getRole() {
      return this.$authService.getUserData().role
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/components/color";

.user {
  display: flex;
  align-items: center;
  cursor: pointer;

  .text {
    display: flex;
    flex-direction: column;
    text-align: right;
    margin-right: 0.8rem;

    .username {
      font-weight: bold;
    }

    .role {
      font-size: smaller;
      line-height: 0.9rem;
    }
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.openable-container {
  position: relative;
  .openable-options {
    top: 48px;
  }
}
</style>
