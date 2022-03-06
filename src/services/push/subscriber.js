import AuthService from "@/services/authService"

export class Subscriber {
  pushEnabled = false

  start() {
    this.enablePushNotifications()
    navigator.serviceWorker.register("serviceWorker.js").then(
      () => {
        console.log("[SW] Service worker has been registered")
        this.push_updateSubscription()
      },
      (e) => {
        console.error("[SW] Service worker registration failed", e)
      }
    )
  }

  checkPermissions() {
    return new Promise((resolve, reject) => {
      if (Notification.permission === "denied") {
        return reject(new Error("Push messages are blocked."))
      }

      if (Notification.permission === "granted") {
        return resolve()
      }

      if (Notification.permission === "default") {
        return Notification.requestPermission().then((result) => {
          if (result !== "granted") {
            reject(new Error("Bad permission result"))
          } else {
            resolve()
          }
        })
      }

      return reject(new Error("Unknown permission"))
    })
  }

  urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  subscribeOnServer(subscription, method) {
    const key = subscription.getKey("p256dh")
    const token = subscription.getKey("auth")
    const contentEncoding = (PushManager.supportedContentEncodings || ["aesgcm"])[0]

    return fetch(process.env.VUE_APP_API_URL + "/push/subscribe", {
      method,
      headers: {
        "x-token": AuthService.getUserData().token
      },
      body: JSON.stringify({
        endpoint: subscription.endpoint,
        publicKey: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
        authToken: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null,
        contentEncoding
      })
    }).then(() => subscription)
  }

  push_updateSubscription() {
    navigator.serviceWorker.ready
      .then((serviceWorkerRegistration) => serviceWorkerRegistration.pushManager.getSubscription())
      .then((subscription) => {
        if (!subscription) {
          // We aren't subscribed to push, so set UI to allow the user to enable push
          return
        }

        // Keep your server in sync with the latest endpoint
        return this.subscribeOnServer(subscription, "PUT")
      })
      .catch((e) => {
        console.error("Error when updating the subscription", e)
      })
  }

  enablePushNotifications() {
    return this.checkPermissions()
      .then(() => navigator.serviceWorker.ready)
      .then((serviceWorkerRegistration) =>
        serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(process.env.VUE_APP_APPLICATION_SERVER_KEY)
        })
      )
      .then((subscription) => {
        return this.subscribeOnServer(subscription, "POST")
      })
      .then(() => (this.pushEnabled = true))
      .catch((e) => {
        if (Notification.permission === "denied") {
          console.warn("Notifications are denied by the user.")
        } else {
          console.error("Impossible to subscribe to push notifications", e)
        }
      })
  }
}
