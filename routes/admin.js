const express = require("express");
const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.get("/", adminController.renderAdminPage);

// Admin manage all Users
router.get("/users", adminController.getAllUsers);
router.delete("/users/:id", adminController.blockUser);

// Admin manage all Posts
router.get("/posts", adminController.getAllPosts);


// Admin manage all Comments

module.exports = router;
