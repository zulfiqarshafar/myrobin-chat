const ChatMessage = require("../models/ChatMessage.js");

// @desc    Post chatroom message.
exports.post_messages = async (messageObject, io, socket) => {
  try {
    const newMessage = new ChatMessage({
      roomId: messageObject.roomId,
      user: messageObject.user,
      content: messageObject.content,
    });
    await newMessage.save();

    const chatMessages = await ChatMessage.find({
      roomId: messageObject.roomId,
    }).sort({ createdAt: -1 });
    io.emit("chatroom:get-messages", chatMessages);
  } catch (err) {
    console.log(err);
    socket.emit("chatroom:post-messages", err);
  }
};

// @desc    Get chatroom messages.
exports.get_messages = async (roomId, socket) => {
  try {
    const chatMessages = await ChatMessage.find({ roomId: roomId }).sort({
      createdAt: -1,
    });
    socket.emit("chatroom:get-messages", chatMessages);
  } catch (err) {
    console.log(err);
    socket.emit("chatroom:get-messages", err);
  }
};
