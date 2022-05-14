const Room = require('../models/room.modal');
const Post = require('../models/post.modal');
const User = require('../models/user.model');
const getDetailRoom = async(req, res, next) => {
    try {
        const user = req.cookies.user;
        const roomId = req.params;
        const room = await Room.findOne({_id: roomId.id});
        const userInfor = await User.findOne({_id: room.userId});
        console.log('user infor: ', userInfor);
        const phoneNumber = userInfor.phoneNumber;
        res.status(200).render('roomDetail', {room, user, phoneNumber, userInfor})
    } catch (error) {
        console.log(error);
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
        userId = req.cookies.user.username;
        const room = req.body;
        const address = req.body.address + ', ' + req.body.ward + ', ' + req.body.district + ', ' + req.body.city;
        room.address = address;
        room.username = userId;
        room.userId = req.cookies.user.user_id;
        const newRoom = new Room(room);
        await newRoom.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).json({msg: error});
    }
}
const postSelectRoom = async(req, res, next) => {
    try {
        
    } catch(error) {
        console.log(error);
    }
}
module.exports = {
    getUploadRoom,
    postUploadRoom,
    getDetailRoom
}