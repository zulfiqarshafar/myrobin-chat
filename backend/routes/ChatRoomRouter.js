const express = require("express");
const chatRoomController = require("../controllers/ChatRoomController.js");

const router = express.Router();

router.post("/join", chatRoomController.post_join);
router.get("/:id", (req, res) => {
  console.log(req.params.id);
});

module.exports = router;
