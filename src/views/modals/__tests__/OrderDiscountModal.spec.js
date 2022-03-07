import { createLocalVue, mount, shallowMount } from "@vue/test-utils"
import orderDiscountModal from "@/views/modals/OrderDiscountModal"
import i18n from "@/i18n"
import store from "@/store/store"
import { BootstrapVue } from "bootstrap-vue"
import "@/plugins/fontAwesome"

describe("orderDiscountModal", () => {
  const localVue = new createLocalVue()
  localVue.use(i18n)
  localVue.use(store)
  localVue.use(BootstrapVue)

  it("should render properly", () => {
    let orderDiscount = shallowMount(orderDiscountModal, { localVue, i18n, store })
    expect(orderDiscount).toMatchSnapshot()
  })

  it("should test onChange and show method", async () => {
    let orderDiscount = mount(orderDiscountModal, { localVue, i18n, store })
    expect(orderDiscount.vm.discount).toBe(0)
    orderDiscount.vm.onChange("discount", 5)
    expect(orderDiscount.vm.discount).toBe(5)
    expect(orderDiscount.vm.$children[0].visible).toBeFalsy()
    orderDiscount.vm.show()
    await orderDiscount.vm.$nextTick()
    expect(orderDiscount.vm.discount).toBe(0)
    expect(orderDiscount.vm.$children[0].isVisible).toBeTruthy()
    orderDiscount.vm.hide()
    await orderDiscount.vm.$nextTick()
    expect(orderDiscount.vm.$children[0].isVisible).toBeFalsy()
  })
})
