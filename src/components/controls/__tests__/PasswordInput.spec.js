import { createLocalVue, shallowMount } from "@vue/test-utils"
import passwordInput from "@/components/controls/PasswordInput"
import i18n from "@/i18n"
import InputTypes from "@/enums/inputTypes"
import IconNames from "@/enums/iconNames"

describe("PasswordInput", () => {
  const localVue = new createLocalVue()
  localVue.use(i18n)

  it("PasswordInput should render properly", () => {
    let passwordElement = shallowMount(passwordInput, { localVue, i18n })
    expect(passwordElement).toMatchSnapshot()
  })

  it("toggleElementType() should work", () => {
    let passwordElement = shallowMount(passwordInput, { localVue, i18n })
    expect(passwordElement.vm.passwordInput.type).toBe(InputTypes.PASSWORD)
    expect(passwordElement.vm.passwordInput.icon).toBe(IconNames.EYE)

    passwordElement.vm.toggleElementType()
    expect(passwordElement.vm.passwordInput.type).toBe(InputTypes.TEXT)
    expect(passwordElement.vm.passwordInput.icon).toBe(IconNames.EYE_SLASH)

    passwordElement.vm.toggleElementType()
    expect(passwordElement.vm.passwordInput.type).toBe(InputTypes.PASSWORD)
    expect(passwordElement.vm.passwordInput.icon).toBe(IconNames.EYE)
  })

  it("emitInput() should work", () => {
    let passwordElement = shallowMount(passwordInput, { localVue, i18n })
    let mockfn = jest.fn()
    passwordElement.vm.$on("input", mockfn)
    passwordElement.vm.emitInput(1)

    expect(mockfn).toBeCalledWith(1, expect.anything())
  })
})
