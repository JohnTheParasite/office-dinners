<template>
  <div class="select-container">
    <div class="input-select" :class="{ show: showOpenable }">
      <text-input :name="name" @click="enableOpenable" ref="input" :placeholder="selectedOptionName" v-model="filter" @focusout="clearInput" />
      <div class="square" @click="enableOpenable">
        <div class="arrow"></div>
      </div>
    </div>
    <div :class="{ show: showOpenable }" class="openable-options">
      <div
        v-for="option in filteredOptions"
        :key="option.value"
        class="option"
        :class="{ selected: option.value === value }"
        v-html="option.text"
        @click="selectOption(option)"
      ></div>
    </div>
  </div>
</template>

<script>
import openableItem from "@/components/controls/openableItem"
import TextInput from "@/components/controls/TextInput"
import control from "@/components/controls/control"
import listControl from "@/components/controls/listControl"

export default {
  name: "SelectInput",
  components: { TextInput },
  mixins: [openableItem, control, listControl],
  data() {
    return {
      filter: ""
    }
  },
  methods: {
    selectOption(option) {
      console.log(option)
      this.value = option.value
      this.closeOpenable()
      this.clearInput()
    },
    enableOpenable() {
      // this.showOpenable = !this.showOpenable
      this.showOpenable = true
      this.$refs.input.value = ""
    },
    clearInput() {
      this.$refs.input.value = ""
      this.filter = ""
    }
  },
  computed: {
    selectedOptionName() {
      return this.options.find((x) => x.value === this.value).text
    },
    filteredOptions() {
      return this.options.filter((x) => x.text.includes(this.filter))
    }
  }
}
</script>

<style lang="scss">
@import "../../scss/components/color";
@import "../../scss/components/variables";

.select-container {
  position: relative;

  .openable-options {
    top: 36px;
    width: 100%;
    padding: 0;
    border-radius: 0.5rem;
    max-height: 18.5rem;
    overflow: auto;

    .selected {
      background: $primary;
      color: $white;
      background-position: right calc(0.3625em + 0.219rem) center;
      background-image: url($check);
      background-repeat: no-repeat;
      background-size: calc(0.725em + 0.438rem) calc(0.725em + 0.438rem);
    }
  }

  .form-control {
    &::placeholder {
      color: $default-text-color !important;
    }

    &:focus {
      &::placeholder {
        color: $grey !important;
      }
    }
  }

  .form-control {
    //background-position: right calc(0.3625em + 0.219rem) center;
    //background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23000000%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E");
    //background-repeat: no-repeat;
    //background-size: 0.8rem;
  }

  .input-select {
    position: relative;

    .square {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      height: 36px;
      width: 36px;
      top: 0;
      right: 0;

      .arrow {
        border-top: 2px solid $grey-dark2;
        border-right: 2px solid $grey-dark2;
        width: 9px;
        height: 9px;
        transform: rotate(135deg);
        margin-top: -4px;
        transition: transform 0.2s ease;
      }
    }

    &.show {
      .arrow {
        transform: rotate(-45deg);
        margin-top: 4px;
        //tran
      }
    }
  }
}
</style>
