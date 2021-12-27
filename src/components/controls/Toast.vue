<template>
  <transition name="toast" @leave="leave">
    <div v-if="show" :class="type" class="toast-m">
      <div class="header">
        <strong class="header-message">{{ $t(messageHeader) }}</strong>
        <button aria-label="Close" class="close-button" type="button" @click="close">×</button>
      </div>
      <div class="body">{{ $t(message) }}</div>
    </div>
  </transition>
</template>

<script>
import SystemTypes from "@/enums/systemTypes"

export default {
  name: "Toast",
  props: {
    type: {
      default: SystemTypes.DEFAULT
    },
    timeout: {
      default: 5000
    },
    autoClose: {
      default: true
    },
    messageLabel: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    }
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
    },
    leave(el) {
      const parent = el.parentNode
      setTimeout(() => {
        if (parent.childNodes.length === 1) {
          document.body.removeChild(parent)
        }
        parent.removeChild(el)
        this.$destroy()
      }, 250)
    }
  },
  computed: {
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

.toast-enter-active,
.toast-leave-active {
  overflow: hidden;
  max-height: 500px;
  transition: all 0.3s ease 0.05s, transform 0.3s ease, margin 0.25s ease, width 0.25s ease;
}

.toast-leave-to,
.toast-enter {
  max-height: 0 !important;
  opacity: 0 !important;
  overflow: hidden;
}

.toast-m {
  position: relative;
  height: auto;
  overflow: hidden;
  transition: all 0.25s ease, transform 0.3s ease 0.1s, max-height 0.25s ease, width 0.25s ease;
  box-sizing: border-box;
  width: 350px;
  max-width: 100%;
  font-size: 0.875rem;
  pointer-events: auto;
  border: 1px solid rgba($black, 0.1);
  box-shadow: 0 0.5rem 1rem rgba($black, 0.15);
  border-radius: 0.25rem;
  margin-bottom: 0.3rem;

  &.default {
    background-color: rgba($white, 0.85);

    .header {
      background-color: $white;
      color: $default-text-color;

      .toast-close-button {
        color: $default-text-color;
      }
    }
  }

  &.primary {
    background-color: rgba($light-grey, 0.85);
    border-color: rgba($purple-light, 0.85);
    color: $purple-dark;

    .header {
      background-color: $primary;
    }
  }

  &.secondary {
    background-color: rgba($light-grey, 0.85);
    border-color: rgba($secondary-border-color, 0.85);
    color: $grey-dark2;

    .header {
      background-color: $secondary;
    }
  }

  &.warning {
    background-color: rgba($white, 0.85);
    border-color: rgba($orange-light, 0.85);
    color: $brown;

    .header {
      background-color: $warning;
    }
  }

  &.danger {
    background-color: rgba($danger-background, 0.85);
    border-color: rgba($danger-border-color, 0.85);
    color: $danger-text-color;

    .header {
      background-color: $danger;
    }
  }

  &.success {
    background-color: rgba($success-background, 0.85);
    border-color: rgba($success-border-color, 0.85);
    color: $success-text-color;

    .header {
      background-color: $green;
    }
  }

  &.info {
    background-color: rgba($info-background-color, 0.85);
    border-color: rgba($info-border-color, 0.85);
    color: $info-text-color;

    .header {
      background-color: $info;
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.15rem 1.14rem;
    border-top-left-radius: 0.286rem;
    border-top-right-radius: 0.286rem;
    user-select: none;
    color: $white;

    .header-message {
      margin-right: 1.5rem;
      font-weight: 600;
      text-transform: capitalize;
    }

    .close-button {
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

  .body {
    display: block;
    box-sizing: border-box;
    padding: 1.14rem;
  }
}
</style>
