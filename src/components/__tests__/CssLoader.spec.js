import CssLoader from "@/components/CssLoader"
import { shallowMount } from "@vue/test-utils"

describe("Render component", () => {
  it("should render loader", () => {
    let component = shallowMount(CssLoader)
    expect(component).toMatchSnapshot()
  })
})
