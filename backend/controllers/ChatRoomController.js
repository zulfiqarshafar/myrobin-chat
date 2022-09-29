const ChatRoom = require("../models/ChatRoom.js");
const ChatMessage = require("../models/ChatMessage.js");

// @desc    User join chatroom.
// @route   POST /room/join
exports.post_join = async (req, res) => {
  const { username, roomId } = req.body;

  try {
    let chatRoom = await ChatRoom.findOne({ roomId });
    if (!chatRoom) {
      const newChatRoom = new ChatRoom({ roomId: roomId });
      chatRoom = await newChatRoom.save();
    }

    for (const user of chatRoom.users) {
      if (user === username) {
        return res.status(500).json({ msg: "Username already used!" });
      }
    }

    chatRoom.users.push(username);
    await chatRoom.save();

    // Set cookie
    res.cookie("myrobinusername", username);

    return res.status(201).json({ data: chatRoom, msg: "Succesfully joined!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// @desc    User leaving chatroom.
// @route   POST /room/exit
exports.post_exit = async (req, res) => {
  const { username, roomId } = req.body;

  try {
    let chatRoom = await ChatRoom.findOne({ roomId });
    if (!chatRoom) {
      return res.status(500).json({ msg: "Room not exist!" });
    }

    const chatMessages = await ChatMessage.find({ roomId: roomId });
    if (chatMessages.length === 0) {
      await ChatRoom.deleteOne({ roomId });
    } else {
      chatRoom.users = chatRoom.users.filter((user) => user !== username);
      await chatRoom.save();
    }

    // Set cookie
    res.clearCookie("myrobinusername");

    return res.status(201).json({ msg: "Succesfully left!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};
