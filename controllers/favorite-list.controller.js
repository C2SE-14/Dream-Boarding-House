const favoriteRoom = require('../models/favoriteRoom.modal');
const Room = require('../models/room.modal');
const getFavoriteList = async(req, res, next) => {
    try {
        let userId = '';
        if(req.cookies.user) {
            userId = req.cookies.user.user_id;
        }
        const listRoomId = await favoriteRoom.find({userId: userId});
        const listFavoriteRoom = [];
        for(let i = 0; i < listRoomId.length; i++) {
            const myFavoriteRoom = await Room.findOne({_id: listRoomId[i].roomId});
            if(myFavoriteRoom) {
                listFavoriteRoom.push(myFavoriteRoom);
            }
        }
        res.render("favoriteList", {title: "favorite room", listFavoriteRoom})
    } catch (error) {
        console.log(error);
        res.status(203).json({ message: error });
    }
}

const postFavoriteList = async(req, res, next) => {
    try {
        let myUserId = req.cookies.user.user_id;
        const roomId = req.params;
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
            const roomBody = {
                isLike: true
            }
            await Room.where({_id: roomId.id}).update(roomBody);
            res.status(200).json({
                code: 1,
                msg: "Đã yêu thích"
            })
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
        console.log('my room id: ', myRoomId.id)
        await favoriteRoom.deleteOne({ roomId: myRoomId.id })
        .then(() => {
            console.log('delete successfully')
        })
        .catch((error) => {
            res.status(500).send(error);
        });

        let userId = '';
        if(req.cookies.user) {
            userId = req.cookies.user.user_id;
        }
        // console.log('userId: ', userId);
        // console.log('roomId: ', myRoomId)
        // const room = await favoriteRoom.findOne({
        //     userId: userId,
        //     roomId: myRoomId
        // })
        const listRoomId = await favoriteRoom.find({userId: userId});
        const listFavoriteRoom = [];
        for(let i = 0; i < listRoomId.length; i++) {
            const myFavoriteRoom = await Room.findOne({_id: listRoomId[i].roomId});
            listFavoriteRoom.push(myFavoriteRoom);
        }
        const roomBody = {
            isLike: false
        }
        await Room.where({_id: myRoomId.id}).update(roomBody);
        res.status(200).redirect('/favoriteList/rooms');
    } catch (error) {
        res.status(500).json({ "message: ": error });
        console.log('error: ', error);
    }
}
module.exports = {
    getFavoriteList,
    postFavoriteList,
    deleteFavoriteList
}