self.addEventListener("push", function (event) {
  if (!(self.Notification && self.Notification.permission === "granted")) {
    return
  }

  const workWithData = (body) => {
    const objectData = JSON.parse(body)
    return self.registration.showNotification(objectData.title, {
      body: objectData.message
    })
  }

  if (event.data) {
    const message = event.data.text()
    event.waitUntil(workWithData(message))
  }
})
