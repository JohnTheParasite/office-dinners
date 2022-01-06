<template>
  <div :class="{ invalid: hasError, readonly: readonly, horizontal: orientation !== 'vertical' }" class="input radio-list form-group">
    <span v-show="hasLabel" class="input-label" v-html="getLabel"></span>
    <span class="input-block">
      <label v-for="option in options" :key="option.value" :for="generateId(option)" class="option">
        <input :id="generateId(option)" v-model="value" :disabled="readonly" :name="name" :value="option.value" type="radio" @change="change" />
        <span class="radio-control">
          <span class="radio-border"></span>
          <span class="radio-checked"></span>
        </span>
        <span v-html="$t(option.text)"></span>
      </label>
    </span>
  </div>
</template>

<script>
import control from "./control"
import listControl from "./listControl"

export default {
  name: "RadioList",
  mixins: [control, listControl],
  props: {
    orientation: {
      default: "vertical"
    }
  },
  methods: {
    generateId(option) {
      return `${this._uid}-${option.value}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/components/color";

.radio-list {
  .input-label {
    margin-bottom: 0.2857rem;
  }

  .input-block {
    flex-direction: column;
    align-items: flex-start;

    .option {
      display: flex;
      align-items: center;
      width: 100%;
      cursor: pointer;
      margin-bottom: 5px;
      font-size: 12px;

      .radio-control {
        width: 18px;
        height: 18px;
        position: relative;
        display: block;
        border-radius: 50%;
        cursor: pointer;
        flex-shrink: 0;
        margin-right: 5px;

        .radio-border {
          border: 2px solid rgb(200, 200, 200);
          background: transparent;
        }

        .radio-border,
        .radio-checked {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          transition: all 0.25s ease;
          top: 0;
          border-radius: 50%;
        }

        .radio-checked {
          background: rgba($primary, 1);
          box-shadow: 0 3px 12px 0 rgba($primary, 0.4);
          transform: scale(0.1);
          opacity: 0;
        }
      }

      input {
        opacity: 0;
        position: absolute;
        width: 20px;
        left: 0;
        height: 0;

        &:checked {
          & + .radio-control {
            cursor: default;

            .radio-border {
              opacity: 0;
              transform: scale(0.3);
            }

            .radio-checked {
              transform: scale(1);
              opacity: 1;
            }
          }
        }
      }
    }
  }

  &.horizontal {
    .input-block {
      flex-direction: row;
      flex-wrap: wrap;

      .option {
        width: auto;
        margin-right: 15px;
      }
    }
  }
}
</style>
