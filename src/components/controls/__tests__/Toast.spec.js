import { createLocalVue, mount, shallowMount } from "@vue/test-utils"
import toast from "@/components/controls/Toast"
import i18n from "@/i18n"

describe("Toast with timeouts", () => {
  const localVue = new createLocalVue()
  localVue.use(i18n)

  it("toast render", async () => {
    jest.useFakeTimers()
    jest.spyOn(global, "setTimeout")

    let toastElem = await shallowMount(toast, { localVue, i18n })

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000)

    jest.runOnlyPendingTimers()

    expect(toastElem).toMatchSnapshot()
  })

  it("leave(event) should work", () => {
    jest.useFakeTimers()
    jest.spyOn(global, "setTimeout")

    const component = {
      template: "<div><toast></toast></div>",
      components: { toast }
    }

    let mockfn = jest.fn()

    document.body.removeChild = mockfn

    let divElem = mount(component, { localVue, i18n })

    let toastElem = divElem.findComponent(toast)

    toastElem.vm.leave(toastElem.vm.$el)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 250)

    jest.runOnlyPendingTimers()

    expect(mockfn).toBeCalled()
  })
})

describe("Tosts", () => {
  const localVue = new createLocalVue()
  localVue.use(i18n)

  it("should render toast with computed", async () => {
    let toastElem = await shallowMount(toast, { localVue, i18n })

    expect(toastElem).toMatchSnapshot()
  })

  it("should render toast with name", async () => {
    let toastElem = await shallowMount(toast, { localVue, i18n, propsData: { header: "test" } })

    expect(toastElem).toMatchSnapshot()
  })
})
