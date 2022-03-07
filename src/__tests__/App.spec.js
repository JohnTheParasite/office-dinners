import { createLocalVue, shallowMount } from "@vue/test-utils"
import App from "@/App"
import VueRouter from "vue-router"

describe("Main app render", () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const router = new VueRouter()

  it("should render APP without errors", () => {
    let component = shallowMount(App, {
      localVue,
      router
    })
    expect(component).toMatchSnapshot()
  })
})
