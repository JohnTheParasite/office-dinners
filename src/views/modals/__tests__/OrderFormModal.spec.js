import { createLocalVue, mount, shallowMount } from "@vue/test-utils"
import orderFormModal from "@/views/modals/OrderFormModal"
import i18n from "@/i18n"
import store from "@/store/store"
import { BootstrapVue } from "bootstrap-vue"
import AuthService from "@/services/authService"
import "@/plugins/fontAwesome"
import { ApiEndpoints } from "@/enums/apiEndpoints"

describe("orderFormModal", () => {
  AuthService.getUserData = () => {
    return { id: 2 }
  }

  const axios = require("axios")
  jest.mock("axios")

  const localVue = new createLocalVue()
  localVue.use(i18n)
  localVue.use(BootstrapVue)

  it("should render properly", () => {
    let orderForm = shallowMount(orderFormModal, { localVue, i18n, store, mocks: { $authService: AuthService } })
    expect(orderForm).toMatchSnapshot()
    orderForm.vm.formGroup.order_name = "test"
    orderForm.vm.formGroup.price = 15
    expect(orderForm.vm.verified).toBeTruthy()
  })

  it("should test show() method", async () => {
    let orderForm = mount(orderFormModal, { localVue, i18n, store, mocks: { $authService: AuthService } })
    expect(orderForm.vm.formGroup.name).toBe("")
    orderForm.vm.show({ name: "test" })
    await orderForm.vm.$nextTick()
    expect(orderForm.vm.$children[0].isVisible).toBeTruthy()
    expect(orderForm.vm.formGroup.name).toBe("test")
  })

  it("should test onChange() method", async () => {
    let orderForm = mount(orderFormModal, { localVue, i18n, store, mocks: { $authService: AuthService } })
    expect(orderForm.vm.formGroup.name).toBe("")
    orderForm.vm.onChange("name", "test")
    expect(orderForm.vm.formGroup.name).toBe("test")
  })

  it("should test add() method", async () => {
    let orderForm = mount(orderFormModal, {
      localVue,
      i18n,
      store,
      mocks: { $authService: AuthService, $axios: axios }
    })
    orderForm.vm.show({ name: "test" })
    await orderForm.vm.$nextTick()
    expect(orderForm.vm.$children[0].isVisible).toBeTruthy()

    axios.post.mockResolvedValueOnce({ data: true })
    await orderForm.vm.add()
    expect(axios.post).toHaveBeenCalledWith(ApiEndpoints.ORDER_ADD, expect.anything())
    await orderForm.vm.$nextTick()
    expect(orderForm.vm.$children[0].isVisible).toBeFalsy()

    axios.post.mockRejectedValueOnce(false)
    await orderForm.vm.add()
    expect(axios.post).toHaveBeenCalledWith(ApiEndpoints.ORDER_ADD, expect.anything())
  })
})
