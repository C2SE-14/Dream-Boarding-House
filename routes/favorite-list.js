const express = require("express");
const favoriteListController = require("../controllers/favorite-list.controller")
const router = express.Router();

/* GET home page. */
router.get("/rooms", favoriteListController.getFavoriteList);
router.post("/room/like/:id", favoriteListController.postFavoriteList)
module.exports = router;