const express = require("express");
const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.get("/", adminController.renderAdminPage);

// Admin manage all Users
router.get("/users", adminController.getAllUsers);

// Admin manage all Posts

// Admin manage all Comments

module.exports = router;
