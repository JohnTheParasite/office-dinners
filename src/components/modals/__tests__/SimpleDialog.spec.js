import { createLocalVue, shallowMount } from "@vue/test-utils"
import simpleDialog from "@/components/modals/SimpleDialog"
import i18n from "@/i18n"
import store from "@/store/store"
import { BootstrapVue } from "bootstrap-vue"

describe("modal for questions", () => {
  const localVue = new createLocalVue()
  localVue.use(i18n)
  localVue.use(store)
  localVue.use(BootstrapVue)

  it("should render SimpleDialog", () => {
    let dialog = shallowMount(simpleDialog, { localVue, i18n, store })
    expect(dialog).toMatchSnapshot()
  })

  it("test showDialog watcher", async () => {
    let dialog = shallowMount(simpleDialog, { localVue, i18n, store })
    expect(dialog.vm.showDialog).toBeFalsy()
    store.commit("dialog/openDialog")
    await dialog.vm.$nextTick()
    expect(dialog.vm.showDialog).toBeTruthy()
    await dialog.vm.$nextTick()
    store.commit("dialog/hideDialog")
    expect(dialog.vm.showDialog).toBeFalsy()
  })

  it("test hide and show methods", () => {
    let dialog = shallowMount(simpleDialog, { localVue, i18n, store })
    dialog.vm.show()
    store.commit("dialog/openDialog")
    expect(dialog.vm.showDialog).toBeTruthy()
    dialog.vm.hide()
    expect(dialog.vm.showDialog).toBeFalsy()
  })
})
