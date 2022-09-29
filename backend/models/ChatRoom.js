const mongoose = require("mongoose");

const chatRoomSchema = mongoose.Schema({
  roomId: { type: String, required: true, trim: true },
  users: [{ type: String, trim: true }],
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
