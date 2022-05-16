const express = require("express");

const manageRoomController = require("../controllers/manageRoom.controller");

const router = express.Router();

/* GET home page. */
router.get("/myRoom/all", manageRoomController.getMyRoom);

module.exports = router;