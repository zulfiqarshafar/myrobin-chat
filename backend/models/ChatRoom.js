const mongoose = require("mongoose");

const chatRoomSchema = mongoose.Schema({
  roomId: { type: Number, required: true },
  users: [String],
  meessages: [{ user: String, content: String, date: Date.now }],
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
