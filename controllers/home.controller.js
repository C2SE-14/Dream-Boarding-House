const Room = require('../models/room.modal')
const getHomePage = async(req, res, next) => {
    try {
        const user = req.cookies.user;
        const list_room = await Room.find();
        res.render("index", {title: "Dream Boarding House", list_room, user})
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getHomePage
}