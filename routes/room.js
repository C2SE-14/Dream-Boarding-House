const express = require('express');
const { route } = require('./register');
const roomController = require('../controllers/room.controller')

const router = express.Router();

router.get('/rooms');
router.get('/:id', roomController.getDetailRoom);
router.post('/upload/room', roomController.postUploadRoom);
router.delete('/delete/room/:id');

router.get('/upload', roomController.getUploadRoom);
module.exports = router;