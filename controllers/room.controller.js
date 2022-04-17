const Room = require('../models/room.modal')
const getUploadRoom = async(req, res, next) => {
    try {
        const user = req.cookies.user
        res.render("upload", {user})
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getUploadRoom
}