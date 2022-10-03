const chatMessageController = require("../controllers/ChatMessageController.js");

const SocketService = (io, socket) => {
  console.log(`Socket ${socket.id} has connected.`);

  // Event listeners
  socket.on("chatroom:join", (roomId) => socket.join(roomId));

  socket.on("chatroom:get-messages", (roomId) =>
    chatMessageController.get_messages(roomId, io)
  );

  socket.on("chatroom:post-messages", (messageObject) => {
    chatMessageController.post_messages(messageObject, io);
  });

  socket.on("chatroom:leave", (roomId) => socket.leave(roomId));

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} has disconnected.`);
  });
};

module.exports = SocketService;
