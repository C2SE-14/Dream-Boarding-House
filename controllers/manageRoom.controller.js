const Room = require('../models/room.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const Role = require('../models/role.model')
const ChooseRoom = require('../models/chooseRoom.model');
const Notification = require('../models/notifications.model');
const getMyRoom = async (req, res, next) => {
    try {
        const user = req.cookies.user;
        let userId, role, showSearch = "no";
        if(user) {
            userId = req.cookies.user.user_id
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
        const listRoom = await Room.find({userId: userId});
        res.status(200).render("manageRoom", {title: "Dream Boarding House", listRoom, user, role, listRoom, showSearch})
    } catch {

    }
}

module.exports = {
    getMyRoom,
}