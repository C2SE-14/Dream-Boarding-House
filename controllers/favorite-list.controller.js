const favoriteRoom = require('../models/favoriteRoom.modal')
const getFavoriteList = async(req, res, next) => {
    try {
        res.render("favoriteList", {title: "Dream Boarding House"})
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const postFavoriteList = async(req, res, next) => {
    try {
        const userId = req.cookies.user._id;
        const roomId = req.params;
        const isLogin = false;
        if(!userId) {
            //check is login in client, if isLogin = false, go to login
        } else {
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
module.exports = {
    getFavoriteList,
    postFavoriteList
}