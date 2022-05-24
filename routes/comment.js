const express = require("express");
const commentController = require("../controllers/comment.controller");
const router = express.Router();

router.post("/post/:id", commentController.postComment);

module.exports = router;