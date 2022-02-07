import { shallowMount } from "@vue/test-utils"
import Toggle from "@/components/controls/Toggle"

describe("Toggle", () => {
  it("should render toggle element", () => {
    let toggleComponent = shallowMount(Toggle)
    expect(toggleComponent).toMatchSnapshot()
  })
})
