const express = require("express");

const manageRoomController = require("../controllers/manageRoom.controller");

const router = express.Router();

/* GET home page. */
router.get("/myRoom/all", manageRoomController.getMyRoom);
router.post("/myRoom/delete/:id", manageRoomController.deleteMyRoom);
module.exports = router;