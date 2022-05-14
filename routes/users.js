const express = require('express');
const userController = require('../controllers/user.controller')

const router = express.Router();
router.get('/infor', userController.getUserInformation);
router.put('/update', userController.updateUserInformation);
router.put('/update', userController.updatePassword);

router.get('/people/:id', userController.showOtherPeopleInfor);
module.exports = router;