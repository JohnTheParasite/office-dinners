export default class FormDataService {
  static getFormData(object) {
    let fd = new FormData()
    Object.keys(object).forEach((key) => {
      fd.append(key, object[key])
    })
    return fd
  }
}
