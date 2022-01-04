export default class FormDataService {
  static getFormData(object) {
    let fd = new FormData()
    Object.keys(object).forEach((key) => {
      if (typeof object[key] === "boolean") {
        object[key] = object[key] ? 1 : 0
      }
      fd.append(key, object[key])
    })
    return fd
  }

  static getDefaultListParameters() {
    return {
      sortKey: "id",
      currentPage: 1,
      perPage: 10,
      isSortDirDesc: false,
      searchValue: ""
    }
  }
}
