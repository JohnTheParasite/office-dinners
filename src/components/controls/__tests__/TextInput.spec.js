import { createLocalVue, shallowMount } from "@vue/test-utils"
import textInput from "@/components/controls/TextInput"
import i18n from "@/i18n"
import IconNames from "@/enums/iconNames"
import "@/plugins/fontAwesome"

describe("TextInput", () => {
  const localVue = new createLocalVue()
  localVue.use(i18n)

  jest.useFakeTimers()
  jest.spyOn(global, "setTimeout")

  it("should render textInput properly", () => {
    let textInputElement = shallowMount(textInput, { localVue, i18n })
    expect(textInputElement).toMatchSnapshot()
  })

  it("should render with icon", () => {
    let textInputElement = shallowMount(textInput, { localVue, i18n, propsData: { icon: IconNames.EYE } })
    expect(textInputElement).toMatchSnapshot()
  })

  it("onIconClick property should work", () => {
    let onIconClickFn = jest.fn()
    let textInputElement = shallowMount(textInput, {
      localVue,
      i18n,
      propsData: { icon: IconNames.EYE, onIconClick: onIconClickFn }
    })
    textInputElement.vm.onIconClick()
    expect(onIconClickFn).toBeCalled()
  })

  it("getFaIcon should work", () => {
    let textInputElement = shallowMount(textInput, { localVue, i18n, propsData: { icon: IconNames.EYE } })
    expect(textInputElement.vm.getFaIcon).toBe("fa-solid fa-eye")
  })

  it("focusIn and focusOut should work", () => {
    let textInputElement = shallowMount(textInput, { localVue, i18n, propsData: { required: true, initValue: "" } })
    expect(textInputElement.vm.focused).toBeFalsy()
    textInputElement.vm.focusin()
    expect(textInputElement.vm.focused).toBeTruthy()
    textInputElement.vm.focusout()
    expect(textInputElement.vm.focused).toBeFalsy()
    expect(textInputElement.vm.errorMessage).not.toBe("")

    textInputElement.setProps({ required: false })
    textInputElement.vm.focusin()
    expect(textInputElement.vm.focused).toBeTruthy()
    textInputElement.vm.focusout()
    expect(textInputElement.vm.focused).toBeFalsy()
    expect(textInputElement.vm.errorMessage).not.toBe("")
  })

  it("click event should work", () => {
    let textInputElement = shallowMount(textInput, { localVue, i18n })
    let clickFunc = jest.fn()
    textInputElement.vm.$on("click", clickFunc)
    textInputElement.vm.click(1)

    expect(clickFunc).toBeCalledWith(1)
  })

  it("input event should work", () => {
    let textInputElement = shallowMount(textInput, { localVue, i18n })

    let inputFunc = jest.fn()
    textInputElement.vm.$on("input", inputFunc)
    textInputElement.vm.input(1)

    expect(inputFunc).toBeCalledWith(undefined, expect.anything(), 1)

    textInputElement.vm.value = "blahBlah"
    textInputElement.vm.input(1)
    expect(inputFunc).toBeCalledWith("blahBlah", expect.anything(), 1)
  })

  it("input event with debounce should work", () => {
    let textInputElement = shallowMount(textInput, { localVue, i18n, propsData: { debounce: true } })
    let inputFunc = jest.fn()
    textInputElement.vm.$on("input", inputFunc)
    textInputElement.vm.input(1)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500)

    jest.runOnlyPendingTimers()

    expect(inputFunc).toBeCalled()
  })

  it("default prop function should work", () => {
    let textInputElement = shallowMount(textInput, { localVue, i18n })
    textInputElement.vm.onIconClick()
  })
})
