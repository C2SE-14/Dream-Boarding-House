const Room = require('../models/room.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const Role = require('../models/role.model')
const ChooseRoom = require('../models/chooseRoom.model');
const Notification = require('../models/notifications.model');
const RoleService = require("../services/role.service");
const getDetailRoom = async(req, res, next) => {
    try {
        const user = req.cookies.user;
        const roomId = req.params;
        const room = await Room.findOne({_id: roomId.id});
        const userInfor = await User.findOne({_id: room.userId});
        const phoneNumber = userInfor.phoneNumber;
        const role = RoleService.getRoleUser;
        res.status(200).render('roomDetail', {room, user, phoneNumber, userInfor, role})
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
        const userId = req.cookies.user.user_id;
        const userInfor = await User.findOne({_id: userId});
        const roomId = req.params.id;
        const room = await Room.findOne({_id: roomId});
        let myRoom = {
            userId: userId,
            roomId: roomId,
        }
        const newRoom = ChooseRoom(myRoom);
        await newRoom.save();
        let bodyNotifi;
        bodyNotifi = {
            ownerId: room.userId,
            userId: userId,
            content: "Tôi quan tâm tới phòng trọ này, hãy liên hệ với tôi qua số điện thoại " + userInfor.phoneNumber,
        }
        const newNotifi = Notification(bodyNotifi);
        await newNotifi.save();
        res.redirect('/')
    } catch(error) {
        console.log(error);
    }
}
const getSelectRoom = async (req, res, next) => {
    try {
        const user = req.cookies.user;
        const userId = req.cookies.user.user_id;
        const role = RoleService.getRoleUser;
        const listRoomId = await ChooseRoom.find({userId: userId});
        const listRoom = [];
        console.log(listRoomId);
        if(listRoomId.length>0) {
            for(let i = 0 ; i < listRoomId.length; i++) {
                const id = listRoomId[i].roomId;
                const room = await Room.findOne({_id: id});
                if(room) {
                    listRoom.push(room);
                }
            }
        }
        res.status(200).render("chooseRoom", {title: "Dream boarding house", listRoom, user, role});
    } catch(error) {
        console.log(error);
    }
}
const deleteSelectRoom = async (req, res, next) => {
    try {
        const roomId = req.params.id;
        await ChooseRoom.deleteOne({roomId: roomId});
        res.status(200).redirect('/')
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getUploadRoom,
    postUploadRoom,
    getDetailRoom,
    postSelectRoom,
    getSelectRoom,
    deleteSelectRoom,
}