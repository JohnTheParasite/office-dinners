<template>
  <div :class="{ show: showOpenable }" class="openable-container">
    <div class="input-select">
      <text-input ref="input" :label="label" :name="name" :placeholder="selectedOptionName" @click="enableOpenable" @focusout="clearInput" @input="setValue" />
      <div class="square" @click="enableOpenable">
        <font-awesome-icon icon="fa-solid fa-chevron-down" />
      </div>
    </div>
    <div class="openable-options">
      <template v-if="filteredOptions.length > 0">
        <div v-for="option in filteredOptions" :key="option.value" :class="{ selected: option.value === value }" class="option" @click="selectOption(option)">
          <div class="text" v-html="$t(option.text)"></div>
          <font-awesome-icon v-if="option.value === value" icon="fa-solid fa-check" />
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
    setValue(value) {
      this.filter = value
    },
    selectOption(option) {
      this.value = option.value
      this.closeOpenable()
      this.clearInput()
      this.change()
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
      return this.options.filter((x) => x.text.toLowerCase().includes(this.filter.toLowerCase()))
    }
  }
}
</script>

<style lang="scss">
.openable-container {
  .input-select {
    .form-control {
      padding-right: 2.5rem !important;
    }
  }
}
</style>
