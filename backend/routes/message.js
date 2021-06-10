const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/Message");

router.post("/message", auth, userCtrl.createMessage);
router.put("/message/:id", auth, userCtrl.modifyMessage);
router.get("/message/:id", auth, userCtrl.getOneMessage);
router.get("/message", auth, userCtrl.getAllMessages);
router.delete("/message/:id", auth, userCtrl.deleteMessage);
router.post("/react/:id", auth, userCtrl.likeMessage);

module.exports = router;
