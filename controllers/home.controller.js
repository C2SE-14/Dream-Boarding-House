const Room = require('../models/room.modal')
const getHomePage = async(req, res, next) => {
    try {
        // await Room.find((err, rooms) => {
        //     if(err) {
        //         console.log('rooms: ', rooms);
        //     }
        //     else {
        //         console.log('err', err);
        //     }
        // })
        res.render("index", {title: "Dream Boarding House"})
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getHomePage
}