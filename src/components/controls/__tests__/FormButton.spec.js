import { createLocalVue, shallowMount } from "@vue/test-utils"
import formButton from "@/components/controls/FormButton"
import i18n from "@/i18n"

describe("FormButton", () => {
  const localVue = createLocalVue()
  localVue.use(i18n)

  it("should render button element", () => {
    let buttonComponent = shallowMount(formButton, { localVue, i18n })
    expect(buttonComponent).toMatchSnapshot()
  })

  it("on click method should work", () => {
    let buttonComponent = shallowMount(formButton, { localVue, i18n })
    let buttonClicked = jest.fn()
    buttonComponent.vm.$on("click", buttonClicked)
    buttonComponent.vm.onclick(1)

    expect(buttonClicked).toBeCalledWith(1)
  })

  it("disabled property should work", () => {
    let buttonComponent = shallowMount(formButton, { localVue, i18n, propsData: { disabled: true } })
    expect(buttonComponent).toMatchSnapshot()
  })

  it("loadingInProgress property should work", () => {
    let buttonComponent = shallowMount(formButton, { localVue, i18n, propsData: { loadingInProgress: true } })
    expect(buttonComponent).toMatchSnapshot()
  })

  it("label property should work", () => {
    let buttonComponent = shallowMount(formButton, { localVue, i18n, propsData: { label: "superbutton" } })
    expect(buttonComponent).toMatchSnapshot()
  })

  it("formType property should work", () => {
    let buttonComponent = shallowMount(formButton, { localVue, i18n, propsData: { formType: "button" } })
    expect(buttonComponent).toMatchSnapshot()
  })

  it("type property should work", () => {
    let buttonComponent = shallowMount(formButton, { localVue, i18n, propsData: { type: "primary" } })
    expect(buttonComponent).toMatchSnapshot()
  })

  it("size property should work", () => {
    let buttonComponent = shallowMount(formButton, { localVue, i18n, propsData: { size: "small" } })
    expect(buttonComponent).toMatchSnapshot()
  })
})
