const SocketServices = (socket) => {
  // Event handlers
  const getChatMessages = (roomId) => {
    // ...
  };

  console.log(`Socket ${socket.id} has connected.`);

  // Event listeners
  socket.on("chatroom:get-message", getChatMessages);

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} has disconnected.`);
  });
};

module.exports = SocketServices;
