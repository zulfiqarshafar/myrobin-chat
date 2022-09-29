const express = require("express");
const chatRoomController = require("../controllers/ChatRoomController.js");

const router = express.Router();

router.post("/join", chatRoomController.post_join);
router.post("/exit", chatRoomController.post_exit);

module.exports = router;
