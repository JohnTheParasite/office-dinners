import { createLocalVue, shallowMount } from "@vue/test-utils"
import radioList from "@/components/controls/RadioList"
import i18n from "@/i18n"

describe("RadioList render", () => {
  const localVue = createLocalVue()
  localVue.use(i18n)

  let mockOptions = [
    { text: "user.admin", value: 1, selected: false },
    { text: "user.user", value: 2, selected: false }
  ]

  it("should render RadioList element", () => {
    let radioListElement = shallowMount(radioList, { localVue, i18n, propsData: { options: mockOptions } })
    expect(radioListElement).toMatchSnapshot()
  })
})

describe("RadioList with horizontal property", () => {
  const localVue = createLocalVue()
  localVue.use(i18n)

  let mockOptions = [
    { text: "user.admin", value: 1, selected: false },
    { text: "user.user", value: 2, selected: false }
  ]

  it("Orientation property should work", () => {
    let radioListElement = shallowMount(radioList, {
      localVue,
      i18n,
      propsData: { options: mockOptions, orientation: "horizontal" }
    })
    expect(radioListElement).toMatchSnapshot()
  })
})

describe("RadioList with initValue property", () => {
  const localVue = createLocalVue()
  localVue.use(i18n)

  let mockOptions = [
    { text: "user.admin", value: 1, selected: false },
    { text: "user.user", value: 2, selected: false }
  ]

  it("initValue property should work", () => {
    let radioListElement = shallowMount(radioList, { localVue, i18n, propsData: { options: mockOptions, initValue: "2" } })
    expect(radioListElement).toMatchSnapshot()
  })
})
