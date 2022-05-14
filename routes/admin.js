const express = require("express");
const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.get("/", adminController.getAdminPage);

module.exports = router;
