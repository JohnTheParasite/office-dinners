<template>
  <div :class="type" class="form-group" role="group">
    <label v-show="getLabel" :for="_uid" class="input-label" v-html="getLabel"></label>
    <div :class="{ invalid: hasError, focused: focused, icon: hasIcon }" class="input-group" role="group">
      <div class="form-group-input-container">
        <textarea
          v-if="multiline"
          :id="_uid"
          :name="name"
          v-model.trim="inputModel"
          :class="{ invalid: hasError }"
          :placeholder="$t(placeholder)"
          :required="required"
          class="form-control"
          @input="input"
          @focusin="focusin"
          @focusout="focusout"
          @click="click"
          rows="4"
        />
        <input
          v-else
          :id="_uid"
          :name="name"
          v-model.trim="inputModel"
          :class="{ invalid: hasError }"
          :placeholder="$t(placeholder)"
          :required="required"
          :type="type"
          class="form-control"
          @input="input"
          @focusin="focusin"
          @focusout="focusout"
          @click="click"
        />
        <span v-if="hasIcon" class="input-icon" @click="onIconClick">
          <font-awesome-icon :icon="getFaIcon" />
        </span>
      </div>
      <small v-show="errorMessage" class="text-error" v-html="errorMessage"></small>
    </div>
  </div>
</template>

<script>
import control from "@/components/controls/control"
import i18n from "@/i18n"

export default {
  name: "TextInput",
  mixins: [control],
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    },
    warningMessage: {
      type: String,
      default: "errors.fieldIsRequired"
    },
    icon: {
      type: String,
      default: ""
    },
    onIconClick: {
      type: Function,
      default: () => {}
    },
    debounce: {
      type: Boolean,
      default: false
    },
    multiline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputModel: "",
      focused: false,
      debounceTimeout: 0
    }
  },
  created() {
    this.inputModel = this.initValue
  },
  computed: {
    getFaIcon() {
      return `fa-solid ${this.icon}`
    },
    value: {
      get() {
        return this.inputModel
      },
      set(value) {
        this.inputModel = value
      }
    },
    hasIcon() {
      return this.icon !== null && this.icon.length > 0
    }
  },
  methods: {
    focusin() {
      this.focused = true
    },
    focusout() {
      this.focused = false
      if (this.required && !this.inputModel.length) {
        this.errorMessage = i18n.t(this.warningMessage, { field: this.getTranslatedLabel })
      }
      this.$emit("focusout", this)
    },
    input(event) {
      this.errorMessage = ""
      if (!this.debounce) {
        this.$emit("input", this.value, this, event)
      } else {
        clearTimeout(this.debounceTimeout)
        this.debounceTimeout = setTimeout(() => {
          this.$emit("input", this.value, this, event)
        }, 500)
      }
    },
    click(event) {
      this.$emit("click", event)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/components/color";

.form-group {
  .input-icon {
    position: absolute;
    right: 0;
    top: 0;
    width: 35px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .input-label {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.2857rem;
    color: $input-label-color;
  }

  .form-group-input-container {
    position: relative;
  }

  .input-group {
    &.icon {
      .form-control {
        padding-right: calc(1.45em + 1.5rem);
      }

      &.invalid {
        .form-control {
          padding-right: calc(1.45em + 0.876rem + 1.5rem);
          background-position: right calc(0.3625em + 0.219rem + 1.5rem) center;
        }
      }
    }

    &.focused {
      .form-control {
        box-shadow: 0 3px 10px 0 rgba($black, 0.1);
        border-color: $primary;
      }
    }

    &.invalid {
      .form-control {
        border-color: $danger;
        padding-right: calc(1.45em + 0.876rem);
      }
    }

    .form-control {
      border: 1px solid $input-border-color;
      outline: none;
      padding: 0.438rem 1rem;
      background-color: $white;
      background-clip: padding-box;
      border-radius: 0.438rem;

      margin: 0;
      width: 100%;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.45;
      color: $default-text-color;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

      resize: none;

      &:not(textarea) {
        height: 36px;
      }

      &::placeholder {
        color: $grey;
        transition: all 0.2s ease;
      }

      &:focus {
        &::placeholder {
          transform: translate(5px);
          transition: all 0.2s ease;
        }
      }

      &.invalid {
        background-position: right calc(0.3625em + 0.219rem) center;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23ea5455' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23ea5455' stroke='none'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-size: calc(0.725em + 0.438rem) calc(0.725em + 0.438rem);
      }
    }
  }

  .text-error {
    color: $danger;
    font-size: 0.857rem;
    font-weight: 400;
  }
}
</style>
