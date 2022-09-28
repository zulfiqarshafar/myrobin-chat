const mongoose = require("mongoose");

const chatMessageSchema = mongoose.Schema(
  {
    user: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

module.exports = ChatMessage;
