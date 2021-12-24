<template>
  <transition name="notification">
    <div v-if="show" :class="type" class="toast-m">
      <div class="toast-m-header">
        <strong class="toast-m-header-message">{{ messageHeader }}</strong>
        <button aria-label="Close" class="toast-close-button" type="button" @click="close">×</button>
      </div>
      <div class="toast-m-body">{{ message }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  props: {
    toast: {}
  },
  data() {
    return {
      show: false,
      activeTimeout: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.show = true
      if (this.autoClose) {
        this.activeTimeout = setTimeout(() => {
          this.close()
        }, this.timeout)
      }
    })
  },
  methods: {
    close() {
      this.show = false
      this.removeFromStore()
    },
    removeFromStore() {
      this.$store.commit("notifications/removeNotification", this.toast)
      this.$destroy()
    }
  },
  computed: {
    text() {
      return this.toast.text
    },
    type() {
      return this.toast.type ?? "default"
    },
    timeout() {
      return this.toast.timeout ?? 5000
    },
    autoClose() {
      return this.toast.autoClose ?? true
    },
    messageLabel() {
      return this.toast.messageLabel ?? ""
    },
    message() {
      return this.toast.message ?? ""
    },
    messageHeader() {
      if (this.messageLabel.trim().length === 0) {
        return this.type
      }
      return this.messageLabel
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/scss/components/_color.scss";

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s;
}

.notification-enter,
.notification-leave-to {
  opacity: 0;
}

.toast-m {
  box-sizing: border-box;
  width: 350px;
  max-width: 100%;
  font-size: 0.875rem;
  pointer-events: auto;
  background-clip: padding-box;
  border: 1px solid rgba($black, 0.1);
  box-shadow: 0 0.5rem 1rem rgba($black, 0.15);
  border-radius: 0.25rem;
  margin-bottom: 0.3rem;

  &.default {
    background-color: rgba($white, 0.85);

    .toast-m-header {
      background-color: $white;
      color: #6e6b7b;

      .toast-close-button {
        color: #6e6b7b;
      }
    }
  }

  &.primary {
    background-color: rgba(249, 248, 254, 0.85);
    border-color: rgba(216, 212, 251, 0.85);
    color: #4c4993;

    .toast-m-header {
      background-color: #7367f0;
    }
  }

  &.secondary {
    background-color: rgba(243, 244, 244, 0.85);
    border-color: rgba(220, 221, 223, 0.85);
    color: #54595f;

    .toast-m-header {
      background-color: #82868b;
    }
  }

  &.warning {
    background-color: rgba($white, 0.85);
    border-color: rgba(255, 228, 202, 0.85);
    color: #956639;

    .toast-m-header {
      background-color: #ff9f43;
    }
  }

  &.danger {
    background-color: rgba(254, 244, 244, 0.85);
    border-color: rgba(249, 207, 207, 0.85);
    color: #8a3f43;

    .toast-m-header {
      background-color: #ea5455;
    }
  }

  &.success {
    background-color: rgba(232, 249, 240, 0.85);
    border-color: rgba(195, 239, 215, 0.85);
    color: #257b50;

    .toast-m-header {
      background-color: #28c76f;
    }
  }

  &.info {
    background-color: rgba(227, 250, 252, 0.85);
    border-color: rgba(184, 242, 249, 0.85);
    color: #107f8f;

    .toast-m-header {
      background-color: #00cfe8;
    }
  }

  .toast-m-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.15rem 1.14rem;
    border-top-left-radius: 0.286rem;
    border-top-right-radius: 0.286rem;
    user-select: none;
    color: $white;

    .toast-m-header-message {
      margin-right: 1.5rem;
      font-weight: 600;
      text-transform: capitalize;
    }

    .toast-close-button {
      padding: 0;
      background-color: transparent;
      border: 0;
      text-shadow: none;
      cursor: pointer;
      font-size: 2rem;
      font-weight: 400;
      line-height: 1;
      color: $white;
      opacity: 0.5;
      transition: opacity 0.3s;

      &:hover {
        opacity: 1;
      }
    }
  }

  .toast-m-body {
    display: block;
    box-sizing: border-box;
    padding: 1.14rem;
  }
}
</style>
