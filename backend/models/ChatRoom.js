const mongoose = require("mongoose");

const chatRoomSchema = mongoose.Schema({
  roomId: { type: String, required: true },
  users: [String],
  meessages: [
    { user: String, content: String, date: { type: Date, default: Date.now } },
  ],
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
