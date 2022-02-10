import { createLocalVue, mount, shallowMount } from "@vue/test-utils"
import selectInput from "@/components/controls/SelectInput"
import i18n from "@/i18n"
import "@/plugins/fontAwesome"

describe("selectInput", () => {
  const localVue = new createLocalVue()
  localVue.use(i18n)

  let mockOptions = [
    { text: "first element", value: 1, selected: false },
    { text: "second element", value: 2, selected: false }
  ]

  it("selectInput should render", () => {
    let selectInputElement = shallowMount(selectInput, { localVue, i18n, propsData: { options: mockOptions } })
    expect(selectInputElement).toMatchSnapshot()
  })

  it("clearInput() should work", () => {
    let selectInputElement = shallowMount(selectInput, { localVue, i18n, propsData: { options: mockOptions } })
    selectInputElement.vm.$refs.input.value = "testValue"
    expect(selectInputElement.vm.$refs.input.value).toBe("testValue")
    selectInputElement.vm.clearInput()
    expect(selectInputElement.vm.$refs.input.value).toBe("")
  })

  it("setValue() should work", () => {
    let selectInputElement = shallowMount(selectInput, { localVue, i18n, propsData: { options: mockOptions } })
    expect(selectInputElement.vm.filter).toBe("")
    selectInputElement.vm.setValue("testValue")
    expect(selectInputElement.vm.filter).toBe("testValue")
  })

  it("selectOption(option) should work", () => {
    let selectInputElement = shallowMount(selectInput, { localVue, i18n, propsData: { options: mockOptions } })
    expect(selectInputElement.vm.value).toBe(1)
    selectInputElement.vm.selectOption(mockOptions[1])
    expect(selectInputElement.vm.value).toBe(2)
  })

  it("enableOpenable() should work", () => {
    let selectInputElement = shallowMount(selectInput, { localVue, i18n, propsData: { options: mockOptions } })
    expect(selectInputElement.vm.showOpenable).toBeFalsy()
    selectInputElement.vm.enableOpenable()
    expect(selectInputElement.vm.showOpenable).toBeTruthy()
  })

  it("toggleOpenable() should work", () => {
    let selectInputElement = shallowMount(selectInput, { localVue, i18n, propsData: { options: mockOptions } })
    expect(selectInputElement.vm.showOpenable).toBeFalsy()
    selectInputElement.vm.toggleOpenable()
    expect(selectInputElement.vm.showOpenable).toBeTruthy()
  })

  it("should onDocumentClick(e) function work", () => {
    const component = {
      template: '<div><select-input :options="options"></select-input></div>',
      components: { selectInput },
      data() {
        return {
          options: mockOptions
        }
      }
    }

    let divElement = mount(component, { localVue, i18n })
    let selectInputElement = divElement.findComponent(selectInput)

    expect(selectInputElement.vm.showOpenable).toBeFalsy()
    selectInputElement.vm.enableOpenable()
    expect(selectInputElement.vm.showOpenable).toBeTruthy()
    selectInputElement.vm.onDocumentClick({ target: selectInputElement.vm.$el })
    expect(selectInputElement.vm.showOpenable).toBeTruthy()

    selectInputElement.vm.onDocumentClick({ target: divElement.vm.$el })
    expect(selectInputElement.vm.showOpenable).toBeFalsy()
  })
})
