const Room = require('../models/room.model');
const Role = require('../models/role.model');
const NotificationService = require('../services/notification');
const getHomePage = async(req, res, next) => {
    try {
        const user = req.cookies.user;
        let userId="", role="";
        if(user) {
            userId = req.cookies.user.user_id;
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
        const listRoom = await Room.find();
        let count = 0;
        let numberNotification = await NotificationService.getNumberNotification(userId);
        console.log("số lượng thông báo này: ", numberNotification);
        const showSearch = "yes";
        //Header must have user and role
        res.render("index", {title: "Dream Boarding House", listRoom, user, role, userId, showSearch, numberNotification});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getHomePage
}