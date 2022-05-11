const express = require('express');
const { route } = require('./register');
const roomController = require('../controllers/room.controller')

const router = express.Router();
router.get('/post', roomController.getUploadRoom);
router.get('/rooms');
router.get('/:id', roomController.getDetailRoom);
router.post('/upload/room', roomController.postUploadRoom);
router.delete('/delete/room/:id');
module.exports = router;