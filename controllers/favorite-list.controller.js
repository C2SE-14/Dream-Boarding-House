const Room = require('../models/room.modal')
const getfavoriteList = async(req, res, next) => {
    try {
        res.render("favoriteList", {title: "Dream Boarding House"})
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getfavoriteList
}