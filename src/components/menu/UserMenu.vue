<template>
  <div class="user-menu">
    <div class="user" @click="toggleOptions">
      <div class="text">
        <span class="username">Username</span>
        <span class="role">role</span>
      </div>
      <div class="avatar">
        <img src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/13-small.d796bffd.png" />
      </div>
    </div>
    <div class="options" :class="{ show: showOptions }">
      <div class="option">
        <fa-icon icon="user"></fa-icon>
        Profile
      </div>
      <div class="separator"></div>
      <div class="option" @click="logout">
        <fa-icon icon="sign-out"></fa-icon>
        Logout
      </div>
    </div>
  </div>
</template>

<script>
import FaIcon from "@/components/icons/FaIcon"
import openableItem from "@/components/controls/openableItem"
export default {
  name: "UserMenu",
  components: { FaIcon },
  mixins: [openableItem],
  data() {
    return {
      showOptions: false
    }
  },
  methods: {
    closeOpenable() {
      this.showOptions = false
    },
    toggleOptions() {
      this.showOptions = !this.showOptions
    },
    logout: function () {
      this.$authService.logoutUser()
      this.$router.push("login")
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

.user-menu {
  position: relative;

  .options {
    border-radius: 0.358rem;
    box-shadow: 0 5px 25px rgba($black-border-color, 10%);
    position: absolute;
    background-color: $white;
    background-clip: padding-box;
    border: 1px solid rgba($black-border-color, 5%);
    padding: 0.5rem 0;
    z-index: 10;
    min-width: 10rem;
    font-size: 1rem;
    right: 0;
    width: 12rem;
    top: 48px;
    margin-top: 10px;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-name: slideIn;
    transform: scaleY(0);
    display: none;

    &.show {
      display: block;
      transform: scale(1);
    }

    .option {
      line-height: 1.5;
      padding: 0.65rem 1.28rem;
      clear: both;
      text-align: inherit;
      background-color: transparent;
      border: 0;
      cursor: pointer;

      i {
        margin-right: 6px;
      }
      &:hover {
        background-color: rgba($primary, 12%);
        color: $primary;
        text-decoration: none;
      }
    }

    .separator {
      margin: 0.5rem 0;
      border-top: 1px solid rgba($black-border-color, 8%);
    }
  }
}
</style>
