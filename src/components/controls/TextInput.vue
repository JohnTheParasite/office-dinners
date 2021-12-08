<template>
  <div role="group" class="form-group">
    <label :for="_uid" class="label-input">
      <span class="input-label" v-show="getLabel" v-html="getLabel"></span>
      <div role="group" class="input-group" :class="{ invalid: hasError, focused: focused }">
        <input
          class="form-control"
          :id="_uid"
          :class="{ invalid: hasError, appear: itsPassword }"
          v-model="inputModel"
          :placeholder="placeholder"
          :required="required"
          :type="type"
          @focusin="focusin"
          @focusout="focusout"
          @input="input"
        />
        <div class="input-group-append" :class="{ appear: itsPassword }" @click="togglePasswordType">
          <div class="input-group-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14px"
              height="14px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="cursor-pointer feather feather-eye-off"
            >
              <path :d="eyeShape"></path>
              <circle v-bind="circle" :class="{ hide: toggled }"></circle>
              <line x1="1" y1="1" x2="23" y2="23" :class="{ hide: !toggled }"></line>
            </svg>
          </div>
        </div>
      </div>
      <small class="text-error" v-show="errorMessage" v-html="errorMessage"></small>
    </label>
  </div>
</template>

<script>
import control from "@/components/controls/control"

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
      default: ""
    },
    itsPassword: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputModel: "",
      focused: false,
      inputType: "",
      toggled: false,
      circle: {
        cx: "12",
        cy: "12",
        r: "3"
      }
    }
  },
  computed: {
    value: {
      get() {
        return this.inputModel
      },
      set(value) {
        this.inputModel = value
      }
    },
    eyeShape() {
      if (!this.toggled) {
        return "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      }
      return "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
    }
  },
  methods: {
    focusin() {
      this.focused = true
    },
    focusout() {
      this.focused = false
      if (this.required && !this.inputModel.length) {
        this.errorMessage = this.warningMessage
      }
    },
    input(event) {
      this.errorMessage = ""
      this.$emit("input", this.value, this, event)
    },
    togglePasswordType() {
      this.$emit("toggle-element-type")
      this.toggled = !this.toggled
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/components/color";

.form-group {
  margin-bottom: 1rem;
  display: block;

  .label-input {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.2857rem;
    color: #5e5873;
    font-size: 0.857rem;
  }

  .input-group {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
    border: 1px solid #d8d6de;
    border-radius: 0.438rem;

    &.focused {
      box-shadow: 0 3px 10px 0 rgba($black, 0.1);
      border-color: $purple;
    }

    &.invalid {
      border-color: $danger;
    }

    .form-control {
      outline: none;
      padding: 0.438rem 1rem;
      background-color: $white;
      background-clip: padding-box;
      border: none;
      border-radius: 0.438rem;

      margin: 0;
      width: 100%;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.45;
      color: #6e6b7b;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

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

      &.appear {
        width: 84%;
      }
    }

    .input-group-append {
      display: none;

      &.appear {
        display: block;
        margin-left: -1px;
      }

      .input-group-text {
        display: flex;
        align-items: center;
        text-align: center;
        vertical-align: center;

        //font-size: 1rem;
        //font-weight: 400;
        //line-height: 1rem;
        //color: $default-text-color;
        //white-space: nowrap;

        padding: 0.65rem 0.5rem;
        margin-bottom: 0;
        background-color: white;
        //border: 1px solid #d8d6de;
        border-radius: 0.438rem;
        //border-left: 0;
        //border-color: $red;
        //border-top-left-radius: 0;
        //border-bottom-left-radius: 0;

        :hover {
          cursor: pointer;
        }

        .hide {
          display: none;
        }
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
