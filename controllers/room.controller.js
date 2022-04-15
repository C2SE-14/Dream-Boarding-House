const Room = require('../models/room.modal')
const getUploadRoom = async(req, res, next) => {
    try {
        res.render("upload", {title: "Dream Boarding House"})
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getUploadRoom
}