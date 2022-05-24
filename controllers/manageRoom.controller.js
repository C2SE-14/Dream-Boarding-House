const Room = require('../models/room.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const Role = require('../models/role.model')
const ChooseRoom = require('../models/chooseRoom.model');
const Notification = require('../models/notifications.model');
const NotificationService = require('../services/notification');
const getMyRoom = async (req, res, next) => {
    try {
        const user = req.cookies.user;
        let userId, role, showSearch = "no";
        if(user) {
            userId = req.cookies.user.user_id
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
        let numberNotification = await NotificationService.getNumberNotification(userId);
        //panigation
        let perPage = 4; 
        let page = req.params.page || 1;
        await Room.find({userId: userId}).skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, listRoom) => {
            Room.countDocuments((err, count) => {
                if(err) return next(err);
                res.status(200).render("manageRoom", {title: "Dream Boarding House", listRoom, current: page, pages: Math.ceil(count / perPage), user, role, listRoom, showSearch, numberNotification})

            })
        });
        
    } catch {

    }
}
const deleteMyRoom = async (req, res, next) => {
    try {
        const roomId = req.params.id;
        const user = req.cookies.user;
        let userId, role, showSearch = "no";
        if(user) {
            userId = req.cookies.user.user_id
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
        let numberNotification = await NotificationService.getNumberNotification(userId);
        await Room.deleteOne({
            userId: userId,
            _id: roomId
        }).exec((error) => {
            if(error) console.log('error: ', error);
            else console.log("xóa thành công");
        })
        let perPage = 4;
        let page = req.params.page || 1;
        let listRoom;
        await Room.find({userId: userId}).skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, listRoom1) => {
            Room.countDocuments((err, count) => {
                if(err) return next(err);
                listRoom = listRoom1                
            })
        });
        // res.status(200).render("manageRoom", {title: "Dream Boarding House", listRoom, current: page, pages: Math.ceil(count / perPage), user, role, listRoom, showSearch, numberNotification})
        res.redirect("/innkeeper/myRoom/all");
    } catch (error) {
        console.log(error);
    }
}
const updateMyRoom = async (req, res, next) => {
    try {
        const roomId = req.params.id;
        id = req.cookies.user.username;
        const room = req.body;
        const address =
          req.body.address +
          ", " +
          req.body.ward +
          ", " +
          req.body.district +
          ", " +
          req.body.city;
        room.address = address;
        room.username = id;
        room.userId = req.cookies.user.user_id;
        let files = req.files;
        let images = [];
        for (let i = 0; i < files.length; i++) {
          images.push({ url: files[i].path });
        }
        room.images = images;
        console.log('room id: ', roomId);
        // await Room.updateOne({Id: roomId}, room);
        await Room.where({_id: roomId}).update(room);
        res.redirect("/innkeeper/myRoom/all");
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getMyRoom,
    deleteMyRoom,
    updateMyRoom,
}