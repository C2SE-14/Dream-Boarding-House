const favoriteRoom = require('../models/favoriteRoom.modal')
const Room = require('../models/room.modal');
const getFavoriteList = async(req, res, next) => {
    try {
        const userId = req.cookies.user._id;
        const listRoomId = await favoriteRoom.find({userId: userId});
        const listRoom = [];
        for(let i = 0; i < listRoomId.length; i++) {
            const favoriteRoom = await Room.findOne({id: listRoomId[i].roomId});
            listRoom.push(favoriteRoom);
        }
        res.render("favoriteList", {title: "favorite room", listRoom})
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const postFavoriteList = async(req, res, next) => {
    try {
        let userId = req.cookies.user.user_id;
        console.log(req.cookies);
        const roomId = req.params;
        const isLogin = false;
        if(!userId) {
            console.log('vao day?');
            //check is login in client, if isLogin = false, go to login
        } else {
            console.log('Thanh cong chua? ');
            isLogin = true;
            const body = {
                userId: userId,
                roomId: roomId.id
            }
            const newFavoriteRoom = new favoriteRoom(body);
            await newFavoriteRoom.save();
            res.redirect('/');
        }
    } catch (error){
        res.status(500).json(error);
        console.log(error);
    }
}
const deleteFavoriteList = async(req, res, next) => {
    try {
        // const userId = req.cookies.user._id;
        console.log('run here');
        const roomId = req.params;
        await favoriteRoom.delete({ roomId: roomId })
        .then(() => {
        res.redirect("/");
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