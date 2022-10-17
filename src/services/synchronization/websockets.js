import { socketBus } from "@/eventBuses/eventBuses"

export class Websockets {
  static webSocket = null

  static connect() {
    if (Websockets.webSocket === null) {
      Websockets.webSocket = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL)
      Websockets.webSocket.addEventListener("message", (received) => {
        socketBus.$emit("newData", received)
      })
    }
  }

  static disconnect() {
    if (Websockets.webSocket !== null) {
      Websockets.webSocket.close()
      Websockets.webSocket = null
    }
  }
}
