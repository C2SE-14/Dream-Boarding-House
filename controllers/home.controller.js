const Room = require('../models/room.modal')
const getHomePage = async(req, res, next) => {
    try {
        const user = req.cookies.user;
        const listRoom = await Room.find();
        res.render("index", {title: "Dream Boarding House", listRoom, user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getHomePage
}