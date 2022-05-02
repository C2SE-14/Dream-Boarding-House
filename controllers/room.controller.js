const Room = require('../models/room.modal')
const getDetailRoom = async(req, res, next) => {
    try {
        const user = req.cookies.user;
        console.log('user in detail: ', user);
        const roomId = req.params;
        const room = await Room.findOne({roomId: roomId});
        res.status(200).render('roomDetail', {room, user})
    } catch (error) {
        res.status(500).json({msg: error});
    }
}
const getUploadRoom = async(req, res, next) => {
    try {
        const user = req.cookies.user
        res.render("upload", {user})
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}
const postUploadRoom = async(req, res, next) => {
    try {
        const room = req.body;
        const address = req.body.address + ', ' + req.body.ward + ', ' + req.body.district + ', ' + req.body.city;
        room.address = address;
        const newRoom = new Room(room);
        await newRoom.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).json({msg: error});
    }
}
module.exports = {
    getUploadRoom,
    postUploadRoom,
    getDetailRoom
}