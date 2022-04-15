const express = require('express');


const router = express.Router();

router.get('/rooms');
router.get('/rooms/:id');
router.post('/upload/rooms/:id')
router.delete('/delete/room/:id')

module.exports = router;