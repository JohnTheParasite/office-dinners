<template>
  <div class="input checkbox" :class="{ invalid: hasError, readonly: readonly }">
    <label :for="_uid">
      <input :id="_uid" @change="change" :disabled="readonly" :required="required" v-model="checked" type="checkbox" />
      <span class="checkbox-control">
        <span class="checkbox-check">
          <fa-icon icon="check"></fa-icon>
        </span>
      </span>
      <span class="input-label" v-show="hasLabel" v-html="getLabel"></span>
    </label>
  </div>
</template>

<script>
import control from "./control"
import FaIcon from "@/components/icons/FaIcon"

export default {
  name: "Checkbox",
  components: { FaIcon },
  mixins: [control],
  props: {
    initValue: { default: false }
  },
  data() {
    return {
      checked: false
    }
  },
  computed: {
    value: {
      get() {
        return this.checked
      },
      set(value) {
        this.checked = value
      }
    }
  },
  methods: {
    reset() {
      this.checked = this.initValue
    }
  },
  created() {
    this.reset()
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/components/color";

.checkbox {
  label {
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: flex-start;
    margin: 0 5px;

    .input-label {
      margin: 0;
      cursor: pointer;
    }

    .checkbox-control {
      margin-right: 5px;
      width: 20px;
      height: 20px;
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      display: flex;
      transform: rotate(-90deg);
      align-items: center;
      border: 2px solid rgb(180, 180, 180);
      justify-content: center;

      .checkbox-check {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        transition: all 0.2s ease;
        z-index: 10;
        transform-origin: right;
        transform: translate(100%);

        i {
          font-size: 11px;
          text-align: center;
          color: inherit;
          transition: all 0.2s ease-out;
          opacity: 0;
          backface-visibility: visible;
          direction: ltr;
        }
      }
    }

    input {
      opacity: 0;
      width: 20px;
      height: 20px;
      position: absolute;

      &:checked + .checkbox-control {
        border: 2px solid rgba($primary, 1) !important;
        background: rgba($primary, 1);
        transform: rotate(0deg);

        .checkbox-check {
          transform: translate(0);

          i {
            opacity: 1;
            color: $white;
            display: flex;
            transform: translate(0);
          }
        }
      }

      &:disabled {
        cursor: default;
        pointer-events: none;

        & + .checkbox-control {
          opacity: 0.4;
          cursor: default;
          pointer-events: none;

          .checkbox-check {
            cursor: default;
            pointer-events: none;
          }
        }
      }
    }
  }

  &.readonly {
    .input-label {
      cursor: default;
    }
  }
}
</style>
