const express = require('express');
const { route } = require('./register');
const roomController = require('../controllers/room.controller')

const router = express.Router();

router.get('/rooms');
router.get('/rooms/:id');
router.post('/upload/rooms/:id');
router.delete('/delete/room/:id');

router.get('/upload', roomController.getUploadRoom);
module.exports = router;