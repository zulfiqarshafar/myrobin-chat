const ChatMessage = require("../models/ChatMessage.js");

// @desc    Post chatroom message.
exports.post_messages = async (messageObject, io) => {
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

    io.in(messageObject.roomId).emit("chatroom:get-messages", chatMessages);
  } catch (err) {
    console.log(err);
    io.in(roomId).emit("chatroom:post-messages", err);
  }
};

// @desc    Get chatroom messages.
exports.get_messages = async (roomId, io) => {
  try {
    const chatMessages = await ChatMessage.find({ roomId: roomId }).sort({
      createdAt: -1,
    });

    io.in(roomId).emit("chatroom:get-messages", chatMessages);
  } catch (err) {
    console.log(err);
    io.in(roomId).emit("chatroom:get-messages", err);
  }
};
