const express = require('express');
const userController = require('../controllers/user.controller')

const router = express.Router();
router.get('/infor', userController.getUserInformation);
router.post('/update', userController.updateUserInformation);
module.exports = router;