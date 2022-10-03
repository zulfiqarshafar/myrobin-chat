import { io } from "socket.io-client";

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection(roomId) {
    this.socket = io(import.meta.env.VITE_API_ENDPOINT);
    this.socket.emit("chatroom:join", roomId);
    this.socket.emit("chatroom:get-messages", roomId);
  }

  getChatMessages(cb) {
    this.socket.on("chatroom:get-messages", cb);
  }

  sendMessage(data) {
    this.socket.emit("chatroom:post-messages", data);
  }

  disconnect(roomId) {
    this.socket.emit("chatroom:leave", roomId);
    this.socket.disconnect();
  }
}

export default new SocketioService();
