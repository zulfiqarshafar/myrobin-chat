const chatMessageController = require("../controllers/ChatMessageController.js");

const SocketService = (io, socket) => {
  console.log(`Socket ${socket.id} has connected.`);

  // Event listeners
  socket.on("chatroom:get-messages", (roomId) =>
    chatMessageController.get_messages(roomId, socket)
  );

  socket.on("chatroom:post-messages", (messageObject) => {
    chatMessageController.post_messages(messageObject, io, socket);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} has disconnected.`);
  });
};

module.exports = SocketService;
