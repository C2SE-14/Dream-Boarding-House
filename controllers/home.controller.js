const Room = require('../models/room.model');
const Role = require('../models/role.model');
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
        for(let i =0;i<listRoom.length; i++) {
            if(listRoom[i].listLike.length>0) {
                console.log("Room " + listRoom[i].address + " co " + listRoom[i].listLike.length +" nguoi like");
                for(let j=0; j<listRoom[i].listLike.length; j++) {
                    if(userId === listRoom[i].listLike[j].userId) {
                        console.log('userId: ', userId);
                        console.log("ai la nguoi like: ", listRoom[i].listLike[j].userId);
                        count++;
                        break;
                    }
                }
                if(count === 0) {
                    console.log("nguoi nay khong like");
                }
            } else {
                console.log("------------------");
                console.log("khong co ai like room nay");
            }
        }
        //Header must have user and role
        res.render("index", {title: "Dream Boarding House", listRoom, user, role, userId});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getHomePage
}