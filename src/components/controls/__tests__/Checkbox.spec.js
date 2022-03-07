import { shallowMount } from "@vue/test-utils"
import Checkbox from "@/components/controls/Checkbox"
import "@/plugins/fontAwesome"

describe("checkbox", () => {
  let checkboxLabel = "test"
  it("should render unchecked checkbox", () => {
    let component = shallowMount(Checkbox)
    expect(component).toMatchSnapshot()
  })

  it("check should works", () => {
    let component = shallowMount(Checkbox)
    expect(component.vm.checked).toBeFalsy()
    component.vm.checked = true
    component.vm.change()
    expect(component.vm.checked).toBeTruthy()
    component.vm.reset()
    expect(component.vm.checked).toBeFalsy()
  })

  it("should render correct label", () => {
    let component = shallowMount(Checkbox, {
      propsData: {
        label: checkboxLabel
      }
    })
    expect(component.vm.getLabel).toBe(checkboxLabel)
  })

  it("should render correct required label", () => {
    let component = shallowMount(Checkbox, {
      propsData: {
        label: checkboxLabel,
        required: true
      }
    })
    expect(component.vm.getLabel).toBe(`<span>${checkboxLabel}<span class="required-star">*</span></span>`)
  })

  it("should set value", () => {
    let component = shallowMount(Checkbox)
    expect(component.vm.checked).toBeFalsy()
    component.vm.value = true
    expect(component.vm.checked).toBeTruthy()
  })
})
