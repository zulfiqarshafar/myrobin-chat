const ChatRoom = require("../models/ChatRoom.js");

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
