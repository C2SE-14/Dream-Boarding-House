const express = require('express');
const userController = require('../controllers/user.controller')

const router = express.Router();
router.get('/infor', userController.getUserInformation);
router.put('/update', userController.updateUserInformation);
router.put('/update', userController.updatePassword);
module.exports = router;