import { createLocalVue, shallowMount } from "@vue/test-utils"
import i18n from "@/i18n"
import toastContainer from "@/components/controls/ToastContainer"
import store from "@/store/store"
// import SystemTypes from "@/enums/systemTypes"

describe("Toast container", () => {
  const localVue = new createLocalVue()
  localVue.use(i18n)
  localVue.use(store)

  it("creates store", () => {
    let wrapper = shallowMount(toastContainer, { localVue, i18n, store })
    expect(store.state.toasts.list.length).toBe(0)
    store.commit("toasts/addSuccessToast", "success")
    expect(store.state.toasts.list.length).toBe(1)
  })
})
