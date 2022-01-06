<template>
  <div class="input toggle form-group" :class="{ invalid: hasError, readonly: readonly }">
    <label :for="_uid">
      <input :id="_uid" @change="change" :disabled="readonly" :required="required" v-model="checked" type="checkbox" />
      <span class="toggle-body">
        <span class="toggle-dot"></span>
      </span>
      <span class="input-label" v-show="hasLabel" v-html="getLabel"></span>
    </label>
  </div>
</template>

<script>
import checkbox from "@/components/controls/Checkbox"

export default {
  name: "Toggle",
  mixins: [checkbox]
}
</script>

<style scoped lang="scss">
@import "../../scss/components/color";

.toggle {
  label {
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: flex-start;
    align-items: center;

    .input-label {
      margin: 0;
      padding-left: 0.5rem;
      cursor: pointer;
    }

    .toggle-body {
      position: relative;
      width: 40px;
      height: 20px;
      background: $grey;
      border-radius: 1rem;
      padding: 2px;
      transition: all 0.1s ease;
      cursor: pointer;

      .toggle-dot {
        display: block;
        position: absolute;
        left: 2px;
        top: 2px;
        height: 16px;
        width: 16px;
        background: $white;
        border-radius: 50%;
        transition: all 0.1s ease;
      }
    }

    input {
      opacity: 0;
      width: 20px;
      height: 20px;
      position: absolute;

      &:checked + .toggle-body {
        justify-content: flex-end;
        background: $primary;

        .toggle-dot {
          left: 22px;
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
