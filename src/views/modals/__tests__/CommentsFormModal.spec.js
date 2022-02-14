import CommentsFormModal from "@/views/modals/CommentsFormModal"
import { createLocalVue, mount, shallowMount } from "@vue/test-utils"
import i18n from "@/i18n"
import { BootstrapVue } from "bootstrap-vue"
import store from "@/store/store"
import "@/plugins/fontAwesome"
import axios from "axios"
import { ApiEndpoints } from "@/enums/apiEndpoints"

describe("CommentsFormModal", () => {
  let localVue = new createLocalVue()
  localVue.use(i18n)
  localVue.use(BootstrapVue)

  const axios = require("axios")
  jest.mock("axios")

  it("should render CommentsFormModal and compute filled fields", () => {
    let commentsModal = mount(CommentsFormModal, { localVue, i18n, store })
    expect(commentsModal).toMatchSnapshot()

    expect(commentsModal.vm.verified).toBeFalsy()

    commentsModal.vm.formGroup.username = "Anonymous"
    commentsModal.vm.formGroup.rating_food = 5
    commentsModal.vm.formGroup.rating_delivery = 5

    expect(commentsModal.vm.verified).toBeTruthy()
  })

  it("should test onChange() and resetFormGroup() method", () => {
    let commentsModal = shallowMount(CommentsFormModal, { localVue, i18n, store })

    expect(commentsModal.vm.formGroup.username).toBe("Anonymous")
    commentsModal.vm.onChange("username", "John")
    expect(commentsModal.vm.formGroup.username).toBe("John")
    commentsModal.vm.resetFormGroup()
    expect(commentsModal.vm.formGroup.username).toBe("Anonymous")
  })

  it("should test show() and getCafeComments() method", async () => {
    let commentsModal = mount(CommentsFormModal, { localVue, i18n, store, mocks: { $axios: axios } })
    expect(commentsModal.vm.cafeId).toBe(undefined)
    axios.get.mockResolvedValueOnce({ data: [] })
    await commentsModal.vm.show("15")
    expect(axios.get).toHaveBeenCalledWith(ApiEndpoints.CAFE_COMMENTS + "/15")
    expect(commentsModal.vm.cafeId).toBe("15")
    expect(commentsModal.vm.$children[0].isVisible).toBeTruthy()
    axios.get.mockRejectedValueOnce(false)
    commentsModal.vm.getCafeComments("15")
    expect(axios.get).toHaveBeenCalledWith(ApiEndpoints.CAFE_COMMENTS + "/15")
  })

  it("should test addComment() method", async () => {
    let commentsModal = shallowMount(CommentsFormModal, { localVue, i18n, store, mocks: { $axios: axios } })

    axios.post.mockResolvedValueOnce({ data: [] })
    await commentsModal.vm.addComment()
    expect(axios.post).toBeCalledWith(ApiEndpoints.CREATE_COMMENT, expect.anything())

    axios.post.mockRejectedValueOnce(false)
    await commentsModal.vm.addComment()
    expect(axios.post).toBeCalledWith(ApiEndpoints.CREATE_COMMENT, expect.anything())
  })
})
