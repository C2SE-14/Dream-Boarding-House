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
        const list_room = await Room.find();
        console.log(list_room);
        res.render("index", {title: "Dream Boarding House", list_room: list_room})
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getHomePage
}