<template>
  <div :class="{ show: showOpenable }" class="openable-container">
    <div class="input-select">
      <text-input ref="input" :name="name" :placeholder="selectedOptionName" @click="enableOpenable" @focusout="clearInput" @input="setValue" />
      <div class="square" @click="enableOpenable">
        <fa-icon icon="chevron-down" />
      </div>
    </div>
    <div class="openable-options">
      <template v-if="filteredOptions.length > 0">
        <div v-for="option in filteredOptions" :key="option.value" :class="{ selected: option.value === value }" class="option" @click="selectOption(option)">
          <div class="text" v-html="option.text"></div>
          <fa-icon v-if="option.value === value" icon="check" />
        </div>
      </template>
      <div v-if="filteredOptions.length === 0" class="no-matching option">
        {{ $t("interface.noMatchingOptions") }}
      </div>
    </div>
  </div>
</template>

<script>
import openableItem from "@/components/controls/openableItem"
import TextInput from "@/components/controls/TextInput"
import control from "@/components/controls/control"
import listControl from "@/components/controls/listControl"
import FaIcon from "@/components/icons/FaIcon"

export default {
  name: "SelectInput",
  components: { FaIcon, TextInput },
  mixins: [openableItem, control, listControl],
  data() {
    return {
      filter: ""
    }
  },
  methods: {
    setValue(value) {
      this.filter = value
    },
    selectOption(option) {
      this.value = option.value
      this.closeOpenable()
      this.clearInput()
    },
    enableOpenable() {
      this.filter = ""
      this.showOpenable = true
      this.$refs.input.value = ""
    },
    clearInput() {
      this.$refs.input.value = ""
    }
  },
  computed: {
    selectedOptionName() {
      return this.options.find((x) => x.value === this.value)?.text
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

.openable-container {
  position: relative;

  .openable-options {
    top: 36px;
    width: 100%;
    padding: 0;
    border-radius: 0.5rem;
    max-height: 18.5rem;
    overflow: auto;

    .selected {
      color: $white;
      background-color: $primary;
      display: flex;
      align-items: center;
      justify-content: space-between;

      i {
        margin: 0;
      }
    }

    .no-matching {
      cursor: default;
      user-select: none;
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

      i {
        transition: transform 0.2s ease;
      }
    }
  }

  &.show {
    .input-select {
      i {
        transform: rotate(-180deg);
      }
    }
  }
}
</style>
