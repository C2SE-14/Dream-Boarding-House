const favoriteRoom = require('../models/favoriteRoom.modal')
const Room = require('../models/room.modal');
const getFavoriteList = async(req, res, next) => {
    try {
        const userId = req.cookies.user.user_id;
        const listRoomId = await favoriteRoom.find({userId: userId});
        const listFavoriteRoom = [];
        for(let i = 0; i < listRoomId.length; i++) {
            const myFavoriteRoom = await Room.findOne({_id: listRoomId[i].roomId});
            listFavoriteRoom.push(myFavoriteRoom);
        }
        res.render("favoriteList", {title: "favorite room", listFavoriteRoom})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}

const postFavoriteList = async(req, res, next) => {
    try {
        let myUserId = req.cookies.user.user_id;
        const roomId = req.params;
        console.log('roomId to like: ', roomId);
        let isLogin = false;
        if(!myUserId) {
        } else {
            isLogin = true;
            const body = {
                userId: myUserId,
                roomId: roomId.id
            }
            const newFavoriteRoom = new favoriteRoom(body);
            await newFavoriteRoom.save();
            res.redirect('/')
        }
    } catch (error){
        res.status(500).json(error);
        console.log(error);
    }
}
const deleteFavoriteList = async(req, res, next) => {
    try {
        // const userId = req.cookies.user._id;
        const myRoomId = req.params;
        console.log('roomId to delete: ', roomId);
        await favoriteRoom.deleteOne({ roomId: myRoomId })
        .then(() => {
        console.log('delete successfully')
        res.status(200).redirect("/");
        })
        .catch((error) => {
        res.status(500).send(error);
        });
    } catch (error) {
        res.status(500).json({ "message": error });
        console.log('error: ', error);
    }
}
module.exports = {
    getFavoriteList,
    postFavoriteList,
    deleteFavoriteList
}