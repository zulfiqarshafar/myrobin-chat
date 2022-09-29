const mongoose = require("mongoose");

const chatMessageSchema = mongoose.Schema(
  {
    roomId: { type: String, required: true, trim: true },
    user: { type: String, required: true, trim: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

module.exports = ChatMessage;
